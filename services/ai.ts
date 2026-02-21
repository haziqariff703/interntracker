import { getGeminiModel } from "@/lib/gemini";

/**
 * Service to handle AI-powered insights for internship applications.
 */
export class AiService {
  /**
   * Generates feedback and suggestions based on application progress.
   */
  static async getApplicationInsights(data: {
    appliedCount: number;
    interviewCount: number;
    offerCount: number;
  }) {
    const model = getGeminiModel("flash");

    const prompt = `
      As an expert career coach, provide brief, actionable insights based on these internship application statistics:
      - Total Applied: ${data.appliedCount}
      - Interviews Secured: ${data.interviewCount}
      - Offers Received: ${data.offerCount}

      Format the output as a clean summary with 3-4 bullet points. Focus on areas of improvement (e.g., resume tweaking if interviews are low, or interview prep if offers are low).
    `;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return "Unable to generate insights at this time. Please try again later.";
    }
  }

  /**
   * Analyzes a job description to provide tailored advice.
   */
  static async analyzeJobDescription(description: string) {
    const model = getGeminiModel("flash");

    const prompt = `
      Analyze this internship job description and provide:
      1. Key skills required.
      2. 3 tailored interview questions to prepare for.
      3. A one-sentence summary of the company's culture (if implied).

      Job Description:
      ${description}

      Format clearly with headers.
    `;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return "Failed to analyze job description.";
    }
  }
}
