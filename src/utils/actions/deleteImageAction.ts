"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "../lib/s3";

export async function deleteImageAction(imgKey: string | undefined) {
    if (!imgKey) return { message: "Missing image key", isSubmitted: true, ok: false };

    try {
        const command = new DeleteObjectCommand({
            Bucket: 'gyanrexa',
            Key: `public/blog/${imgKey}`,
        })
        await s3Client.send(command);
        return { message: 'Image removed successfully', isSubmitted: true, ok: true };
    } catch (error) {
        return { message: 'Image removal failed', isSubmitted: true, ok: false };
    }
}