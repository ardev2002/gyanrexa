"use server";

import {
    UpdateCommand,
    BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../lib/dynamoClient";
import { POSTS_TABLE } from "../lib/CONFIG";
import { getPostWithSections } from "../lib/getPosts";
import { PostWithSections, Section } from "@/type";

export async function updateBlogAction(prevState: any, formData: FormData) {
    const blogUrl = formData.get("blogUrl") as string;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const sections = JSON.parse(formData.get("sections") as string);
    try {
        // 1️⃣ Update the main blog post
        const post = await getPostWithSections(blogUrl) as PostWithSections;

        await dynamoClient.send(
            new UpdateCommand({
                TableName: POSTS_TABLE,
                Key: {
                    blogUrl
                },
                UpdateExpression:
                    "SET #title = :title, #category = :category, updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#title": "title",
                    "#category": "category",
                },
                ExpressionAttributeValues: {
                    ":title": title,
                    ":category": category,
                    ":updatedAt": new Date().toISOString(),
                },
                ReturnValues: "ALL_NEW",
            })
        );

        // 3️⃣ Determine sections to delete (not in updated sections)
        const updatedOrders = sections.map((s: Section) => s.order);
        const sectionsToDelete = post.sections.filter((s) => !updatedOrders.includes(s.order))
            .map((s) => ({
                DeleteRequest: {
                    Key: { blogUrl, order: s.order },
                },
            }));

        // 4️⃣ Prepare sections to put (insert or update)
        const sectionsToPut = sections.map((section: Section) => ({
            PutRequest: {
                Item: {
                    blogUrl,
                    order: section.order,
                    subheading: section.subheading,
                    paragraph: section.paragraph,
                    imgKey: section.imgKey,
                },
            },
        }));

        // 5️⃣ Batch write sections (up to 25 items per batch)
        const allRequests = [...sectionsToPut, ...sectionsToDelete];
        const BATCH_SIZE = 25;

        for (let i = 0; i < allRequests.length; i += BATCH_SIZE) {
            const batch = allRequests.slice(i, i + BATCH_SIZE);
            await dynamoClient.send(
                new BatchWriteCommand({
                    RequestItems: {
                        Sections: batch,
                    },
                })
            );
        }

        return { message: "Blog updated successfully", isSubmitted: true, ok: true };
    } catch (error) {
        console.error("Error updating blog:", error);
        return { message: "Failed to update blog", isSubmitted: false, ok: false };
    }
}
