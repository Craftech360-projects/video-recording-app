import { Check } from 'lucide-react';

interface VideoPreviewControlsProps {
  onRetry: () => void;
  onSubmit: () => void;
}

export function VideoPreviewControls({ onRetry, onSubmit }: VideoPreviewControlsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
      <button
        onClick={onRetry}
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full"
      >
        Retry
      </button>
      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center space-x-2"
      >
        <span>Submit</span>
        <Check className="w-4 h-4" />
      </button>
    </div>
  );
}