import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "./dynamoClient";
import { Post, Section } from "@/type";

export async function getRecentPostsWithFirstSection(posts: Post[]) {
  const results = await Promise.all(
    posts.map(async (post) => {
      const sectionRes = await dynamoClient.send(
        new QueryCommand({
          TableName: "Sections",
          KeyConditionExpression: "blogUrl = :b",
          ExpressionAttributeValues: {
            ":b": post.blogUrl,
          },
          Limit: 1, // Only fetch the first section
        })
      );

      const firstSection = (sectionRes.Items as Section[])[0];
      return { ...post, firstSection };
    })
  );

  return results;
}
