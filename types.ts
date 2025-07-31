
export interface Scene {
  description: string;
  imageUrl: string;
  choices: string[];
}

export interface GeminiSceneResponse {
    sceneDescription: string;
    imagePrompt: string;
    choices: string[];
}

export interface StoryHistoryItem {
  sceneDescription: string;
  playerChoice: string;
}
