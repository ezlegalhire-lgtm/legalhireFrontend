import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading services...</p>
      </div>
    </div>
  );
}