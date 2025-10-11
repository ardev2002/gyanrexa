// create a route handler for upload an image to s3 bucket with credentials
import { NextRequest, NextResponse } from "next/server";
import { uploadToPresignedUrl } from "@/utils/s3";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const url = formData.get("url") as string;
    try {
        await uploadToPresignedUrl(url, file);
        const imgUrl = `https://gyanrexa.s3.ap-south-1.amazonaws.com`;
        return NextResponse.json({ message: 'Image uploaded successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Image upload failed' });
    }
}