import { GoogleGenAI } from "@google/genai";
import { AttackEvent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeThreat(attack: AttackEvent) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI Analysis unavailable: API Key missing.";
  }

  try {
    const prompt = `
      You are an elite cybersecurity AI assistant. 
      Analyze the following attack event and provide a concise (max 2 sentences) mitigation strategy.
      
      Attack Type: ${attack.attackType}
      Severity: ${attack.severity}
      Source IP: ${attack.sourceIp}
      Target IP: ${attack.targetIp}
      Description: ${attack.description}
      
      Format: "ANALYSIS: [Your analysis] | ACTION: [Recommended action]"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "AI Analysis failed to generate a response.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "AI Analysis failed to process threat signature.";
  }
}
