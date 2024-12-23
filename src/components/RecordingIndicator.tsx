import React from 'react';

export function RecordingIndicator() {
  return (
    <div className="absolute top-4 right-4">
      <div className="animate-pulse flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="text-white text-sm">Recording...</span>
      </div>
    </div>
  );
}