"use server";
import { revalidatePath } from "next/cache";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { BatchWriteCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Section } from "@/type";
import { POSTS_TABLE } from "../lib/CONFIG";
export async function publishBlogAction(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const blogUrl = formData.get("blogUrl") as string;
    const category = formData.get("categoryId") as 'MOBILES' | 'TECHNOLOGY' | 'TIPS_AND_TRICKS' | 'LIFESTYLE' | 'HEALTH_AND_WELLNESS' | 'ENTERTAINMENT' | 'SPORTS';
    const author = formData.get("author") as string;
    const sections = JSON.parse(formData.get("sections") as string);
    const time = new Date().toISOString();
    const fields = { title, blogUrl, category, author, time, sections };
    try {
        await dynamoClient.send(new PutCommand({
            TableName: POSTS_TABLE,
            Item: {
                blogUrl, // partition key
                createdAt: time, // sort key
                title,
                category,
                author,
                updatedAt: time,
            }
        }))

        if (sections) {
            const sectionRequests = sections.map((section: Section) => ({
                PutRequest: {
                    Item: {
                        blogUrl,
                        order: section.order,
                        subheading: section.subheading,
                        paragraph: section.paragraph,
                        imgKey: section.imgKey,
                    }
                }
            }))

            await dynamoClient.send(
                new BatchWriteCommand({
                    RequestItems: {
                        Sections: sectionRequests
                    }
                })
            )
        }
        revalidatePath('/')
        return { message: 'Blog published successfully', isSubmitted: true, ok: true }
    } catch (error) {
        return { message: 'Something went wrong', isSubmitted: true, ok: false, fields: fields }
    }
}