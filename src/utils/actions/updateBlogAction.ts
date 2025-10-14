"use server";

export async function updateBlogAction(prevState: any, formData: FormData){
    return { message: "Blog updated successfully", isSubmitted: true, ok: true }
}