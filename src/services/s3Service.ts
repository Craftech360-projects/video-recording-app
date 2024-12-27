import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from '../config/aws'; // Corrected import

// Initialize the S3 client using awsConfig
const s3Client = new S3Client({
  region: awsConfig.region,
  credentials: awsConfig.credentials,
});

/**
 * Uploads a file to an S3 bucket.
 *
 * @param file - The file to upload.
 * @returns A Promise resolving to the public URL of the uploaded file.
 */
export async function uploadToS3(file: File): Promise<string> {
  const key = `videos/${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: awsConfig.bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
    return `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload to S3');
  }
}
