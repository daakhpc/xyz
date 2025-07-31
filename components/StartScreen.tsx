
import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface StartScreenProps {
  onStart: (theme: string) => void;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, isLoading }) => {
  const [theme, setTheme] = useState('');
  const [placeholder, setPlaceholder] = useState('A noir mystery in a city of robots...');

  const placeholders = [
    'A noir mystery in a city of robots...',
    'A high-fantasy quest for a lost artifact...',
    'Surviving on a jungle planet full of strange creatures...',
    'A cyberpunk heist to steal corporate data...',
    'A pirate adventure on the haunted seas...',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() || placeholder) {
      onStart(theme.trim() || placeholder);
    }
  };

  const handleNewIdea = () => {
    let newPlaceholder = placeholder;
    while(newPlaceholder === placeholder) {
        newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    }
    setPlaceholder(newPlaceholder);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-4">
      <div className="text-center mb-8 animate-fade-in-down">
        <SparklesIcon className="w-16 h-16 mx-auto text-purple-400" />
        <h1 className="text-5xl font-bold mt-4" style={{fontFamily: 'Lora, serif'}}>Gemini Adventure Weaver</h1>
        <p className="text-gray-400 mt-2 text-lg">Your story, created in an instant.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg animate-fade-in-up">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-2xl">
          <label htmlFor="theme" className="block text-lg font-semibold mb-2 text-purple-300" style={{fontFamily: 'Poppins, sans-serif'}}>
            Describe the adventure you want to have:
          </label>
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-4">
             <button
              type="button"
              onClick={handleNewIdea}
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
            >
              Suggest another idea
            </button>
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
                {isLoading ? 'Weaving...' : 'Start Adventure'}
                {!isLoading && <SparklesIcon className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StartScreen;
