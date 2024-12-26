import { uploadToS3 } from "./s3Service";
import workflowData from "../config/ai_videobooth.json"; // Adjust the path to match your structure

export async function uploadVideo(videoBlob: Blob): Promise<string> {
  try {
    // Convert blob to file
    const file = new File([videoBlob], `video-${Date.now()}.mp4`, {
      type: "video/mp4",
    });

    console.log("Uploading file to S3:", file);

    // Upload directly to S3
    const s3Url = await uploadToS3(file);

    console.log("S3 upload successful. S3 URL:", s3Url);

    // Update the workflow JSON
    const workflow = updateWorkflow(workflowData, s3Url);

    console.log("Updated workflow:", workflow);

    // Send the updated workflow to the API
    const uniqueNumber = await sendWorkflowToApi(workflow);

    console.log("Video processed successfully. Unique number:", uniqueNumber);

    return uniqueNumber;
  } catch (error) {
    console.error("Error in video processing:", error);
    throw error;
  }
}

function updateWorkflow(workflow: any, videoPath: string): any {
  try {
    const updatedWorkflow = { ...workflow };

    // Update fields in the workflow
    updatedWorkflow["3"]["inputs"]["text"] =
      "(Masterpiece, best quality:1.2), hanuman with a sword and dark night as background";
    updatedWorkflow["6"]["inputs"]["text"] =
      "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry , deformed,nsfw, deformed legs";
    updatedWorkflow["7"]["inputs"]["seed"] = Math.floor(
      Math.random() * 1000000000
    );
    updatedWorkflow["105"]["inputs"]["video"] = videoPath;
    updatedWorkflow["107"]["inputs"]["ckpt_name"] =
      "darkSushiMixMix_colorful.safetensors";

    return updatedWorkflow;
  } catch (error) {
    console.error("Error updating workflow:", error);
    throw error;
  }
}

async function sendWorkflowToApi(workflow: any): Promise<string> {
  try {
    const response = await fetch("http://127.0.0.1:8000/process-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workflow }),
    });

    if (!response.ok) {
      throw new Error("Failed to process video via API");
    }

    const responseData = await response.json();
    return responseData.unique_number;
  } catch (error) {
    console.error("Error sending workflow to API:", error);
    throw error;
  }
}
