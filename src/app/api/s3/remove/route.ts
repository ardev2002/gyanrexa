// create an api route handler for removing file from s3
import { NextRequest, NextResponse } from "next/server";
import { removeImageFromS3 } from "@/utils/s3";

export async function POST(request: NextRequest) {
    const { imageUrl } = await request.json();
    try {
        await removeImageFromS3(imageUrl);
        return NextResponse.json({ message: "Image removed successfully" });
    } catch (error) {
        return NextResponse.error();
    }
}