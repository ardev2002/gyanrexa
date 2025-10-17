"use server";
import { isBlogURLAvailable } from "@/utils/lib/isBlogURLAvailable";

export async function isBlogURLAvailableAction(prevState: any, formData: FormData) {
    const blogUrl = formData.get("blogUrl") as string;
    if (!blogUrl) return { message: "Missing blog URL", isSubmitted: true, ok: false };
    try {
        const isAvailable = await isBlogURLAvailable(blogUrl);
        return { message: `${isAvailable ? "Available" : "Not Available"}`, isSubmitted: true, ok: isAvailable, blogUrl };
    } catch (error: any) {
        return { message: error.message, isSubmitted: true, ok: false };
    }
}