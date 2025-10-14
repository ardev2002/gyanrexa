import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_ID!
    }
})

export async function uploadToPresignedUrl(url: string, file: File) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file,
    });

    if(!res.ok) throw new Error('Failed to upload image to S3');
    return NextResponse.json({ message: 'Image uploaded successfully' });
}

export async function removeImageFromS3(imgKey: string) {
    const key = `blog-images/${imgKey}`;
    const command = new DeleteObjectCommand({
        Bucket: 'gyanrexa',
        Key: key,
    });

    try {
        await s3Client.send(command);
    } catch (error) {
        console.error('Error removing image from S3:', error);
        throw error;
    }
}


export async function getSignedUrlForUpload(fileName: string, fileType: string) {
    const key = `blog-images/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
        Bucket: 'gyanrexa',
        Key: key,
        ContentType: fileType,
    })
    try {
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { signedUrl, key };
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw error;
    }
}