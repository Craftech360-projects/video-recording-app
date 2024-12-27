export const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || '', // Ensure a fallback value
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
  bucketName: import.meta.env.VITE_AWS_BUCKET_NAME || '',
};
