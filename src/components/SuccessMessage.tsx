import React from 'react';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
      <Check className="w-16 h-16 text-green-500 mb-4" />
      <p className="text-white text-xl">Video Uploaded Successfully!</p>
      <button
        onClick={onReset}
        className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100"
      >
        Record Another
      </button>
    </div>
  );
}