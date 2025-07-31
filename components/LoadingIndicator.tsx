
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <div className="text-center text-white p-8 rounded-lg">
        <SparklesIcon className="w-16 h-16 text-purple-400 mx-auto animate-pulse" />
        <h2 className="mt-4 text-2xl font-semibold tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Weaving the next thread of fate...
        </h2>
        <p className="mt-2 text-gray-400">Please wait while the world comes into view.</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
