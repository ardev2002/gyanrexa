"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_ID!
    }
})

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