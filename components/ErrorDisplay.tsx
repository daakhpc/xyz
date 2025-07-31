
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
  onRestart: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-red-900/50 border border-red-700 rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-red-200" style={{ fontFamily: 'Poppins, sans-serif' }}>An Unexpected Turn</h2>
        <p className="mt-2 text-red-300">
          {message || "The path ahead is unclear. An unknown error occurred."}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Try Again
          </button>
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
