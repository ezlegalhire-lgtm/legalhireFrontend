import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-heading-3 text-slate-900 mb-2">Error Loading Services</h2>
        <p className="text-body text-slate-600 mb-6">{message}</p>
        <button 
          onClick={onRetry}
          className="btn-primary px-6 py-3"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}