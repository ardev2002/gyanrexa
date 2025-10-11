"use server";
import { revalidatePath } from "next/cache";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { BatchWriteCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export async function publishBlog(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const blogUrl = formData.get("slug") as string;
        const category = formData.get("categoryId") as 'MOBILES' | 'TECHNOLOGY' | 'TIPS_AND_TRICKS' | 'LIFESTYLE' | 'HEALTH_AND_WELLNESS' | 'ENTERTAINMENT' | 'SPORTS';
        const author = formData.get("author") as string;
        const sections = JSON.parse(formData.get("sections") as string);
        const time = new Date().toISOString();
        await dynamoClient.send(new PutCommand({
            TableName: 'Posts',
            Item: {
                blogUrl,
                title,
                category,
                author,
                createdAt: time,
                updatedAt: time,
            }
        }))

        if (sections) {
            const sectionRequests = sections.map((section: any) => ({
                PutRequest: {
                    Item: {
                        blogUrl,
                        order: section.order,
                        subheading: section.subheading,
                        paragraph: section.paragraph,
                        imgUrl: section.imgUrl
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

        revalidatePath('/');
    } catch (error) {
        console.log(error);
    }
}