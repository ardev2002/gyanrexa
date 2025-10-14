"use server";
import { getPostWithSections } from "@/utils/lib/getPosts";
import { isBlogURLAvailable } from "@/utils/lib/isBlogURLAvailable";

export async function getPostAction(prevState: any, formData: FormData) {
    const blogUrl = formData.get("blogUrl") as string;
    if (!blogUrl) return { message: "Missing blog URL", isSubmitted: true, ok: false };
    try {
        const isAvailable = await isBlogURLAvailable(blogUrl);
        if (!isAvailable) return { message: "Blog not found", blogUrl, isSubmitted: true, ok: false };
        const res = await getPostWithSections(blogUrl);
        if(res === undefined) return { message: "Blog not found", blogUrl, isSubmitted: true, ok: false };
        return { message: "The blog is found", blogUrl, post: res, isSubmitted: true, ok: true }
    } catch (error) {
        return { message: "Failed to fetch blog", blogUrl, isSubmitted: true, ok: false }
    }
}