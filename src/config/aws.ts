export const AWS_CONFIG = {
  region: import.meta.env.VITE_AWS_REGION || 'your-region',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || 'your-access-key',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || 'your-secret-key'
  },
  bucketName: import.meta.env.VITE_AWS_BUCKET_NAME || 'your-bucket-name'
};