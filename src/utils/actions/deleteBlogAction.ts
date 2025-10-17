"use server";
import { BatchWriteCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { POSTS_TABLE, SECTIONS_TABLE } from "../lib/CONFIG";
import { getPostWithSections } from "../lib/getPosts";
import { Section } from "@/type";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../lib/s3";
import { revalidatePath } from "next/cache";

export async function deleteBlogAction(prevState: any, formData: FormData) {
    const blogUrl = formData.get("blogUrl") as string;
    if (!blogUrl) return { message: "Missing blog URL", isSubmitted: true, ok: false };

    try {
        const post = await getPostWithSections(blogUrl)
        if (!post) return { message: "Blog not found", isSubmitted: true, ok: false };


        const deleteRequests = post.sections.map((section: Section) => ({
            DeleteRequest: {
                Key: {
                    blogUrl,
                    order: section.order
                }
            }
        }))

        const sectionsCommand = new BatchWriteCommand({
            RequestItems: {
                [SECTIONS_TABLE]: deleteRequests
            }
        })

        // Delete the blog post
        await dynamoClient.send(
            new DeleteCommand({
                TableName: POSTS_TABLE,
                Key: { blogUrl },
            })
        );

        await dynamoClient.send(sectionsCommand);

        const imgKeys = post.sections.map(section => section.imgKey).filter(Boolean);

        if (!imgKeys || imgKeys.length === 0) {
            return { message: "Blog deleted successfully", isSubmitted: true, ok: true }
        }
        else {
            const imgDeleteCommand = new DeleteObjectsCommand({
                Bucket: 'gyanrexa',
                Delete: {
                    Objects: imgKeys.map(key => ({ Key: key }))
                }
            })

            await s3Client.send(imgDeleteCommand);
        }
        return { message: "Blog deleted successfully", isSubmitted: true, ok: true };
    } catch (error) {
        return { message: "Failed to delete blog", isSubmitted: true, ok: false };
    }
    finally{
        revalidatePath('/crud');
    }
}