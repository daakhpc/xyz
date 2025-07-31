
import React from 'react';
import type { Scene } from '../types';

interface GameScreenProps {
  scene: Scene;
  onChoose: (choice: string) => void;
  onRestart: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scene, onChoose, onRestart }) => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 lg:p-8 flex flex-col">
       <button 
        onClick={onRestart}
        className="absolute top-4 right-4 bg-gray-800/70 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors z-20"
        >
        New Adventure
      </button>
      <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Image Column */}
        <div className="lg:w-1/2 flex-shrink-0">
          <div className="aspect-w-16 aspect-h-9 w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700">
            {scene.imageUrl ? (
              <img src={scene.imageUrl} alt="Scene visual" className="w-full h-full object-cover animate-fade-in" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-gray-500">Visualizing scene...</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Text and Choices Column */}
        <div className="lg:w-1/2 flex flex-col bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex-grow overflow-y-auto pr-2">
             <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed text-lg">
                <p className="whitespace-pre-wrap animate-fade-in-up">
                    {scene.description}
                </p>
             </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-bold text-purple-300 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>What do you do next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoose(choice)}
                  className="w-full text-left p-4 bg-gray-700 rounded-lg hover:bg-purple-800/50 border border-transparent hover:border-purple-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
