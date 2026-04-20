import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_FILE = path.join(process.cwd(), "audit_logs.xlsx");

// Helper to append data to Excel
function appendToExcel(sheetName: string, data: any) {
  let workbook: XLSX.WorkBook;
  
  if (fs.existsSync(EXCEL_FILE)) {
    workbook = XLSX.readFile(EXCEL_FILE);
  } else {
    workbook = XLSX.utils.book_new();
  }

  let worksheet = workbook.Sheets[sheetName];
  let existingData: any[] = [];

  if (worksheet) {
    existingData = XLSX.utils.sheet_to_json(worksheet);
  }

  existingData.push({
    ...data,
    timestamp: new Date().toISOString()
  });

  const newWorksheet = XLSX.utils.json_to_sheet(existingData);
  
  if (worksheet) {
    workbook.Sheets[sheetName] = newWorksheet;
  } else {
    XLSX.utils.book_append_sheet(workbook, newWorksheet, sheetName);
  }

  XLSX.writeFile(workbook, EXCEL_FILE);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "operational", 
      timestamp: new Date().toISOString(),
      region: "ASIA-SOUTH-1"
    });
  });

  app.get("/api/simulation/scenarios", (req, res) => {
    res.json([
      { id: '1', name: 'SSH Brute Force', type: 'BRUTE_FORCE', difficulty: 'MEDIUM', description: 'Simulate multiple failed SSH login attempts.' },
      { id: '2', name: 'SQL Injection', type: 'SQL_INJECTION', difficulty: 'HIGH', description: 'Inject malicious SQL payloads into web parameters.' },
      { id: '3', name: 'DDoS SYN Flood', type: 'DDOS', difficulty: 'HARD', description: 'Overwhelm target with high volume SYN packets.' },
      { id: '4', name: 'Stealth Port Scan', type: 'PORT_SCAN', difficulty: 'EASY', description: 'Silent Nmap scan to identify open ports.' },
    ]);
  });

  // Endpoint to record logs to Excel
  app.post("/api/audit/log", (req, res) => {
    try {
      appendToExcel("SystemLogs", req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Excel Log Error:", error);
      res.status(500).json({ error: "Failed to write to Excel" });
    }
  });

  // Endpoint to record attacks to Excel
  app.post("/api/audit/attack", (req, res) => {
    try {
      appendToExcel("AttackEvents", req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Excel Attack Error:", error);
      res.status(500).json({ error: "Failed to write to Excel" });
    }
  });

  // Endpoint to record any event to Excel
  app.post("/api/audit/event", (req, res) => {
    try {
      const { sheet, data } = req.body;
      appendToExcel(sheet || "GeneralEvents", data);
      res.json({ success: true });
    } catch (error) {
      console.error("Excel Event Error:", error);
      res.status(500).json({ error: "Failed to write to Excel" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DevMate-AI] Server running on http://localhost:${PORT}`);
    console.log(`[DevMate-AI] Audit logs will be saved to: ${EXCEL_FILE}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
