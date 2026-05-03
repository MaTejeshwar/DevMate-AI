# DevMate-AI: AI-Powered Cyber Range & SOC Simulator

**DevMate-AI** is a next-generation, full-stack cybersecurity simulation and defense platform. It provides a high-fidelity "Digital Twin" environment for organizations to model, detect, and mitigate complex cyber threats using advanced AI and automated response protocols.

---

## 🚀 Overview

In an era of escalating digital warfare, **DevMate-AI** bridges the gap between theoretical security and real-world combat. It acts as a comprehensive Cyber Range where security professionals can:
- **Simulate** complex attack scenarios (SQLi, DDoS, Brute Force).
- **Detect** threats in real-time using a signature-based detection engine.
- **Mitigate** attacks automatically via an AI-driven response system.
- **Audit** every event through a permanent Excel-based persistence layer.

---

## ✨ Key Features

### 🧠 AI-Driven Intelligence (Matrix-AI)
Powered by **Gemini 3 Flash-Preview**, our AI core provides:
- **Real-Time Threat Analysis**: Instant mitigation playbooks for detected attacks.
- **AI Chat Assistant**: A persistent terminal-style interface for technical queries.
- **Log Summarization**: 3-point executive summaries of raw system logs.
- **Scenario Generation**: Generative AI creates unique, technical attack scenarios on the fly.

### 🛡️ Automated Response System
- **Zero-Touch Defense**: Automatically executes firewall rules and IP blacklisting upon detection of critical threats.
- **Auto-Pilot Mode**: Toggle between manual operator response and fully automated system mitigation.

### 📊 Military-Grade Visualization
- **SOC Dashboard**: Real-time telemetry, global threat maps, and traffic orchestration charts.
- **Architecture View**: Interactive visual breakdown of the full-stack infrastructure and data flow.

### 📁 Excel Audit Persistence
- **Permanent Record**: Every log, attack, and response is committed to a multi-sheet Excel database (`audit_logs.xlsx`).
- **Audit-Ready**: Provides a centralized, unchangeable record for compliance and forensic reporting.

---

## 🏗️ Architecture

The platform follows a modern, layered architecture designed for performance and scalability:

- **Client Layer (Frontend)**: React 19, Framer Motion, Recharts, Tailwind CSS.
- **Orchestration Layer (Backend)**: Node.js, Express, Vite Middleware.
- **Intelligence Layer (AI)**: Google Gemini 3 Flash API.
- **Persistence Layer (Database)**: Excel (XLSX) File System Integration.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **Data**: [SheetJS (XLSX)](https://sheetjs.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Gemini API Key (set as `GEMINI_API_KEY` in environment)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/DevMate-AI.git
   cd DevMate-AI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 Usage

1. **Initialize SOC**: Launch the dashboard to start the real-time telemetry stream.
2. **Trigger Scenarios**: Use the Scenario Controller to launch manual or AI-generated attacks.
3. **Monitor Detection**: Watch the Threat Detection Engine identify signatures in the live log feed.
4. **Execute Response**: Enable Auto-Pilot to see the system automatically block malicious IPs.
5. **Review Audits**: Open `audit_logs.xlsx` to view the permanent record of all operations.

---

## 📜 License

This project is licensed under the Apache-2.0 License.

---

**DevMate-AI** // *The Intelligent Core of Modern SOC Operations*
