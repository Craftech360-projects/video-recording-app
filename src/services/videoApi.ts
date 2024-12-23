import { uploadToS3 } from './s3Service';

export async function uploadVideo(videoBlob: Blob): Promise<string> {
  try {
    // Convert blob to file
    const file = new File([videoBlob], `video-${Date.now()}.mp4`, {
      type: 'video/mp4',
    });

    console.log('Uploading file to S3:', file);

    // Upload directly to S3
    const s3Url = await uploadToS3(file);

    console.log('S3 upload successful. S3 URL:', s3Url);

    // Send the S3 URL to the specified API endpoint
    const response = await fetch('http://127.0.0.1:8000/process-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_path: s3Url }),
    });

    if (!response.ok) {
      throw new Error('Failed to process video');
    }

    const responseData = await response.json();
    console.log('Video processed successfully:', responseData);

    return s3Url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}