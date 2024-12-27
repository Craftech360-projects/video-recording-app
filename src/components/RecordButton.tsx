import { Video } from 'lucide-react';

interface RecordButtonProps {
  onClick: () => void;
}

export function RecordButton({ onClick }: RecordButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
    >
      <Video className="w-5 h-5" />
      <span>Start Recording</span>
    </button>
  );
}