import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const generateCityGuideResponse = async (query: string, governorate: string) => {
  if (!apiKey) {
    throw new Error("Gemini API key is not available.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert city guide for Iraq. The user is asking about ${governorate}. Query: ${query}. Provide a helpful, concise, and engaging response in Markdown format. Focus on local culture, hidden gems, and practical advice.`,
      config: {
        systemInstruction: "You are IraqCompass AI, a knowledgeable and friendly local guide. You provide accurate information about Iraqi cities, culture, food, and landmarks. Keep responses structured with headings and bullet points where appropriate.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
