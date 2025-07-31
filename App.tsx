
import React, { useState, useCallback } from 'react';
import { GameState } from './constants';
import type { Scene, StoryHistoryItem } from './types';
import { generateAdventureScene, generateAdventureImage } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_SCREEN);
  const [scene, setScene] = useState<Scene | null>(null);
  const [adventureTheme, setAdventureTheme] = useState<string>('');
  const [storyHistory, setStoryHistory] = useState<StoryHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<{ theme: string; choice: string | null } | null>(null);


  const generateNextScene = useCallback(async (theme: string, choice: string | null) => {
    setGameState(GameState.LOADING);
    setError(null);
    setLastAction({ theme, choice });

    let currentHistory = storyHistory;
    if (choice && scene) {
      const newHistoryItem = { sceneDescription: scene.description, playerChoice: choice };
      currentHistory = [...storyHistory, newHistoryItem].slice(-4); // Keep last 4 for context
    }

    try {
      const sceneData = await generateAdventureScene(theme, currentHistory);
      const imageUrl = await generateAdventureImage(sceneData.imagePrompt);

      const newScene: Scene = {
        description: sceneData.sceneDescription,
        imageUrl: imageUrl,
        choices: sceneData.choices,
      };
      
      setScene(newScene);
      if (choice) {
        setStoryHistory(currentHistory);
      }
      setGameState(GameState.PLAYING);
    } catch (e) {
      const err = e as Error;
      setError(err.message);
      setGameState(GameState.ERROR);
    }
  }, [storyHistory, scene]);

  const handleStartGame = (theme: string) => {
    setAdventureTheme(theme);
    setStoryHistory([]);
    setScene(null);
    generateNextScene(theme, null);
  };

  const handleChoice = (choice: string) => {
    generateNextScene(adventureTheme, choice);
  };

  const handleRestart = () => {
    setGameState(GameState.START_SCREEN);
    setScene(null);
    setStoryHistory([]);
    setAdventureTheme('');
    setError(null);
  };

  const handleRetry = () => {
    if (lastAction) {
      generateNextScene(lastAction.theme, lastAction.choice);
    } else {
        handleRestart();
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.PLAYING:
      case GameState.LOADING:
      case GameState.ERROR:
        if (scene) {
          return <GameScreen scene={scene} onChoose={handleChoice} onRestart={handleRestart}/>;
        }
        // Fallthrough to start screen if no scene but in playing state (e.g. after error)
        return <StartScreen onStart={handleStartGame} isLoading={gameState === GameState.LOADING} />;
      case GameState.START_SCREEN:
      default:
        return <StartScreen onStart={handleStartGame} isLoading={gameState === GameState.LOADING} />;
    }
  };

  return (
    <main>
      {renderContent()}
      {gameState === GameState.LOADING && <LoadingIndicator />}
      {gameState === GameState.ERROR && error && (
         <ErrorDisplay message={error} onRetry={handleRetry} onRestart={handleRestart} />
      )}
    </main>
  );
};

export default App;
