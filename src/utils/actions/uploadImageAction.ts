"use server";

export async function uploadImageAction(formData: FormData) {
    const file = formData.get('file') as File;
    const signedUrl = formData.get('signedUrl') as string;
    try {
        const { ok } = await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });
        if (ok) return { message: 'Image uploaded successfully', ok, isSubmitted: true };
        return { message: 'Image upload failed', ok, isSubmitted: true };
    } catch (error) {
        return { message: 'Image upload failed', ok: false, isSubmitted: true };
    }
}