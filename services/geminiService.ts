import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventDescription = async (title: string): Promise<string> => {
  try {
    const prompt = `Generate a compelling and exciting event description for an event titled "${title}". The description should be around 2-3 paragraphs long and suitable for a public event listing. Make it sound professional yet engaging.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating event description:", error);
    throw new Error("Failed to generate event description. Please try again.");
  }
};

export const generateEventImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A vibrant, high-quality, cinematic event banner for: ${prompt}.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating event image:", error);
    throw new Error("Failed to generate event image. Please try again.");
  }
};
