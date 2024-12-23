export interface UploadResponse {
  videoUrl: string;
}

export interface S3PresignedPost {
  url: string;
  fields: Record<string, string>;
}