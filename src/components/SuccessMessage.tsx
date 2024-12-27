interface SuccessMessageProps {
  onReset: () => void;
  uniqueCode: string;
}

export function SuccessMessage({ onReset, uniqueCode }: SuccessMessageProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="text-white text-center space-y-4">
        <h2 className="text-2xl">Upload Successful!</h2>
        <p>HERE'S YOUR CODE</p> {/* Display the unique code here */}
        <button onClick={onReset} className="bg-blue-500 text-white px-4 py-2 rounded">
        <strong>{uniqueCode}</strong>
        </button>
      </div>
    </div>
  );
}
