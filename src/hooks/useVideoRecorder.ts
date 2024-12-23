import { useRef, useState } from 'react';
import { RecordingState } from '../types/video';

export function useVideoRecorder() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', aspectRatio: 9/16 },
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = videoUrl;
          videoRef.current.play();
        }
        
        setRecordedVideo(videoUrl);
        setRecordingState('preview');
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };

      setRecordingState('recording');
      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 5000);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const resetRecording = () => {
    setRecordingState('idle');
    setRecordedVideo(null);
    chunksRef.current = [];
    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  return {
    recordingState,
    setRecordingState,
    recordedVideo,
    videoRef,
    startRecording,
    resetRecording
  };
}