import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env manually since we are running with node
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ No API Key found in .env.local");
    process.exit(1);
}

console.log("🔑 API Key found (length: " + apiKey.length + ")");

const ai = new GoogleGenAI({ apiKey: apiKey });

async function test() {
    try {
        console.log("📡 Sending request to Gemini...");
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: 'Hello, are you working?',
        });

        console.log("✅ Response received!");
        console.log("Type of response.text:", typeof response.text);

        if (typeof response.text === 'function') {
            console.log("⚠️ response.text is a FUNCTION. You should call it: response.text()");
            console.log("Content:", response.text());
        } else if (typeof response.text === 'string') {
            console.log("✅ response.text is a STRING.");
            console.log("Content:", response.text);
        } else {
            console.log("❓ response.text is " + typeof response.text);
            console.log("Full Response keys:", Object.keys(response));
        }

    } catch (e) {
        console.error("❌ Error:", e);
    }
}

test();
