// create an api route handler for removing file from s3
import { NextRequest, NextResponse } from "next/server";
import { removeImageFromS3 } from "@/utils/lib/s3";

export async function POST(request: NextRequest) {
    const { imgKey } = await request.json() as { imgKey: string };
    try {
        await removeImageFromS3(imgKey);
        return NextResponse.json({ message: "Image removed successfully" });
    } catch (error) {
        return NextResponse.error();
    }
}