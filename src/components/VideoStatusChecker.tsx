import React, { useState } from 'react';
import { Loader2, Download, AlertCircle } from 'lucide-react';

const VideoStatusChecker = () => {
    const [uniqueNumber, setUniqueNumber] = useState('');
    const [status, setStatus] = useState({
        isProcessed: false,
        finalPath: null,
        isLoading: false,
        error: null,
        message: '' // Added message for additional feedback
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUniqueNumber(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!uniqueNumber.trim()) {
            setStatus({
                isProcessed: false,
                finalPath: null,
                isLoading: false,
                error: 'Unique Number is required.',
                message: ''
            });
            return;
        }

        setStatus(prev => ({ ...prev, isLoading: true, error: null, message: '' }));

        try {
            const response = await fetch(`http://127.0.0.1:8000/check-status/${uniqueNumber}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Invalid ID: Video not found.');
                }
                throw new Error('Invalid code!');
            }

            const data = await response.json();

            if (data.final_path === null) {
                setStatus({
                    isProcessed: true,
                    finalPath: null,
                    isLoading: false,
                    error: null,
                    message: 'The video is still processing. Please check back later.'
                });
            } else {
                setStatus({
                    isProcessed: data.is_processed,
                    finalPath: data.final_path,
                    isLoading: false,
                    error: null,
                    message: '' // Clear any previous message
                });
            }
        } catch (error) {
            setStatus({
                isProcessed: false,
                finalPath: null,
                isLoading: false,
                error: error.message,
                message: '' // Clear any previous message
            });
        }
    };

    const handleDownload = () => {
        if (status.finalPath) {
            window.open(status.finalPath, '_blank');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md pt-">
            <h2 className="text-xl font-semibold mb-4">Check Video Status</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-2 block" htmlFor="uniqueNumber">
                        Video Code:
                    </label>
                    <input
                        id="uniqueNumber"
                        type="text"
                        value={uniqueNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Video Code"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Check Status
                </button>
            </form>

            {status.isLoading ? (
                <div className="flex items-center gap-2 text-blue-600 mt-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Checking status...</span>
                </div>
            ) : status.error ? (
                <div className="flex items-center gap-2 text-red-600 mt-4">
                    <AlertCircle className="h-5 w-5" />
                    <span>{status.error}</span>
                </div>
            ) : status.message ? (
                <div className="flex items-center gap-2 text-yellow-600 mt-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{status.message}</span>
                </div>
            ) : status.isProcessed && status.finalPath ? (
                <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 text-green-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Video processing completed!</span>
                    </div>

                    <div>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Download Video
                        </button>

                        <div className="mt-4">
                            <img
                                src={status.finalPath}
                                alt="GIF Preview"
                                className="w-full rounded"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default VideoStatusChecker;
