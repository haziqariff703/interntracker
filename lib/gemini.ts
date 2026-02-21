import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.AI_API_KEY) {
  throw new Error("AI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

/**
 * Get a Gemini model instance.
 * @param type 'flash' for speed/free tier (gemini-1.5-flash) or 'pro' for complex reasoning (gemini-1.5-pro)
 */
export const getGeminiModel = (type: "flash" | "pro" = "flash") => {
  const modelName = type === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash";
  return genAI.getGenerativeModel({ model: modelName });
};

// Default export for quick usage
export const aiModel = getGeminiModel("flash");
