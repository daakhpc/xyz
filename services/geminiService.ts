
import { GoogleGenAI, Type } from "@google/genai";
import type { GeminiSceneResponse, StoryHistoryItem } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    sceneDescription: {
      type: Type.STRING,
      description: "A detailed and atmospheric description of the current scene (2-3 paragraphs). It should be engaging and well-written.",
    },
    imagePrompt: {
      type: Type.STRING,
      description: "A concise, visually descriptive prompt for an AI image generator, capturing the essence of the scene. Include style hints like 'fantasy art', 'sci-fi concept art', 'dramatic lighting', 'cinematic'.",
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of 3 or 4 short, action-oriented choices for the player. Each choice should lead to a distinct outcome.",
      items: { type: Type.STRING },
    },
  },
  required: ["sceneDescription", "imagePrompt", "choices"],
};

const buildPrompt = (theme: string, history: StoryHistoryItem[]): string => {
  if (history.length === 0) {
    return `Create the starting scene for an adventure with the theme: "${theme}".`;
  }

  const historyText = history.map(item => 
    `Scene: ${item.sceneDescription}\nPlayer Chose: ${item.playerChoice}`
  ).join('\n\n---\n\n');

  return `Continue the story based on the player's last choice.
  Theme: ${theme}
  
  Story so far:
  ${historyText}
  
  Generate the next scene, a prompt for an image of that scene, and new choices for the player. The story should be coherent and evolve based on the choices.`;
};


export const generateAdventureScene = async (
  theme: string,
  history: StoryHistoryItem[]
): Promise<GeminiSceneResponse> => {
  const prompt = buildPrompt(theme, history);

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a master storyteller creating a dynamic, interactive text-based adventure game. Your goal is to generate vivid scenes, compelling choices, and descriptive image prompts. Your responses must be in JSON format conforming to the provided schema. The story should be creative and adapt to player choices.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = result.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    // Basic validation
    if (
      !parsedResponse.sceneDescription ||
      !parsedResponse.imagePrompt ||
      !Array.isArray(parsedResponse.choices)
    ) {
      throw new Error("Invalid JSON structure from Gemini API.");
    }
    
    return parsedResponse as GeminiSceneResponse;
  } catch (error) {
    console.error("Error generating adventure scene:", error);
    throw new Error("Failed to weave the next part of our tale. The mists of creation are cloudy.");
  }
};

export const generateAdventureImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Imagen API did not return any images.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating adventure image:", error);
    throw new Error("Failed to visualize the scene. The artist's vision is blurred.");
  }
};
