import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { POSTS_TABLE, SECTIONS_TABLE } from "./CONFIG";
import { dynamoClient } from "./dynamoClient";
import { PostWithSections, Section } from "@/type";

export async function getRecentPosts(): Promise<{ post: (Omit<PostWithSections, 'sections'> & { firstSection: Omit<Section, "order"> })[] }> {
  const result = await dynamoClient.send(
    new ScanCommand({
      TableName: POSTS_TABLE,
      Limit: 5,
    })
  );

  const recentPosts = result.Items?.map(item => ({
    blogUrl: item.blogUrl as string,
    title: item.title as string,
    author: item.author as string,
    category: item.category as string,
    createdAt: item.createdAt as string,
    updatedAt: item.updatedAt as string,
  })) ?? [];

  // now fetch first section for each post
  const firstSectionPromises = recentPosts.map(async rp => {
    const { Items: sectionItems } = await dynamoClient.send(
      new QueryCommand({
        TableName: SECTIONS_TABLE,
        KeyConditionExpression: "blogUrl = :blogUrl",
        ExpressionAttributeValues: { ":blogUrl": rp.blogUrl },
        Limit: 1,
      })
    );

    const firstSection = sectionItems?.[0];
    return {
      ...rp,
      firstSection: {
        subheading: firstSection?.subheading as string,
        paragraph: firstSection?.paragraph as string,
        imgKey: firstSection?.imgKey as string,
      },
    };
  });

  const recentPostsWithFirstSection = await Promise.all(firstSectionPromises);
  return { post: recentPostsWithFirstSection };
}
