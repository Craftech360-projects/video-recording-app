import React, { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { useVideoRecorder } from '../hooks/useVideoRecorder';
import { uploadVideo } from '../services/videoApi';
import { RecordButton } from './RecordButton';
import { RecordingIndicator } from './RecordingIndicator';
import { VideoPreviewControls } from './VideoPreviewControls';
import { SuccessMessage } from './SuccessMessage';

export default function VideoRecorder() {
  const {
    recordingState,
    setRecordingState,
    recordedVideo,
    videoRef,
    startRecording,
    resetRecording
  } = useVideoRecorder();
  const [uniqueCode, setUniqueCode] = useState('');
  const handleSubmit = async () => {
    if (!recordedVideo) return;

    setRecordingState('uploading');

    try {
      const response = await fetch(recordedVideo);
      const blob = await response.blob();
      const videoUrl = await uploadVideo(blob);
      console.log('Video uploaded successfully:', videoUrl);
      setUniqueCode(videoUrl);
      setRecordingState('success');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
      setRecordingState('preview');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-[360px] aspect-[9/16] relative bg-black rounded-2xl overflow-hidden shadow-xl">
        {recordingState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera className="w-16 h-16 text-white mb-4" />
            <RecordButton onClick={startRecording} />
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${recordingState === 'idle' ? 'hidden' : ''}`}
          src={recordedVideo || undefined}
        />

        {recordingState === 'recording' && <RecordingIndicator />}

        {recordingState === 'preview' && (
          <VideoPreviewControls
            onRetry={resetRecording}
            onSubmit={handleSubmit}
          />
        )}

        {recordingState === 'uploading' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-white">Uploading...</span>
            </div>
          </div>
        )}

        {recordingState === 'success' && (
          <SuccessMessage
            onReset={resetRecording}
            uniqueCode={uniqueCode} // Pass the unique code to SuccessMessage
          />
        )}
      </div>
    </div>
  );
}