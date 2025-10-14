"use server";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { POSTS_TABLE, SECTIONS_TABLE } from "../lib/CONFIG";

export async function deleteBlogAction(prevState: any, formData: FormData) {
    const blogUrl = formData.get("blogUrl") as string;
    if (!blogUrl) return { message: "Missing blog URL", isSubmitted: true, ok: false };

    try {
        // Delete the blog post
        await dynamoClient.send(
            new DeleteCommand({
                TableName: POSTS_TABLE,
                Key: { blogUrl },
            })
        );

        // Delete the blog sections
        await dynamoClient.send(
            new DeleteCommand({
                TableName: SECTIONS_TABLE,
                Key: { blogUrl },
            })
        );

        return { message: "Blog deleted successfully", isSubmitted: true, ok: true };
    } catch (error) {
        return { message: "Failed to delete blog", isSubmitted: true, ok: false };
    }
}