import { getSignedUrlForUpload } from "@/utils/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    const fileType = searchParams.get('fileType');
    if (!fileName || !fileType) return NextResponse.json({ error: 'Missing file name or type', status: 400 });
    const {signedUrl, key } = await getSignedUrlForUpload(fileName, fileType);
    return NextResponse.json({ signedUrl, key });
}