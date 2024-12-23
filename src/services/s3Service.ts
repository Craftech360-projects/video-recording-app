import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_CONFIG } from '../config/aws';

const s3Client = new S3Client({
  region: AWS_CONFIG.region,
  credentials: AWS_CONFIG.credentials
});

export async function uploadToS3(file: File): Promise<string> {
  const key = `videos/${Date.now()}-${file.name}`;
  
  const command = new PutObjectCommand({
    Bucket: AWS_CONFIG.bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
    return `https://${AWS_CONFIG.bucketName}.s3.${AWS_CONFIG.region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload to S3');
  }
}