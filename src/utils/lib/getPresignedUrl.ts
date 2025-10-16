import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_WEB_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_ID!
    }
})

export async function getPresignedUrl(fileName: string, fileType: string) {
    const imgKey = `public/blog/${Date.now()}-${fileName}`;
    try {
        const command = new PutObjectCommand({
            Bucket: 'gyanrexa',
            Key: imgKey,
            ContentType: fileType,
        })

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { url, imgKey };
    } catch (error) {
        console.error('Error getting signed URL:', error);
        return { url: undefined, imgKey: undefined };
    }

}