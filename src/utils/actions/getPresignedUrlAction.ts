"use server";

import { getPresignedUrl } from "../lib/getPresignedUrl";

export interface CustomFormData {
    fileName: string;
    fileType: string;
}

export interface PresignedURLReturn {
    message?: string;
    signedUrl?: string;
    imgKey?: string;
    ok: boolean;
}

export async function getPresignedUrlAction({ fileName, fileType }: CustomFormData): Promise<PresignedURLReturn> {
    if (!fileName || !fileType) return { message: "Missing file name or type", ok: false };
    try {
        const { url, imgKey } = await getPresignedUrl(fileName, fileType);
        return { signedUrl: url, imgKey, ok: true };
    } catch (error) {
        return { message: "Failed to generate signed URL", ok: false };
    }
}