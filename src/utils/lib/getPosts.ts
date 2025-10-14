import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "./dynamoClient";
import { GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { PostWithSections, Section } from "@/type";

const POSTS_TABLE = "Posts";
const SECTIONS_TABLE = "Sections";

export async function getPostsWithSections(
  client: DynamoDBClient,
  limit = 10,
  nextToken?: string
) {
  const scanCommand = new ScanCommand({
    TableName: POSTS_TABLE,
    Limit: limit,
    ExclusiveStartKey: nextToken ? JSON.parse(nextToken) : undefined,
  });

  const { Items, LastEvaluatedKey } = await client.send(scanCommand);

  // 2️⃣ For each post, fetch its sections
  const posts = await Promise.all(
    (Items || []).map(async (item) => {
      const blogUrl = item.blogUrl.S as string;
      const queryCommand = new QueryCommand({
        TableName: SECTIONS_TABLE,
        KeyConditionExpression: "blogUrl = :blogUrl",
        ExpressionAttributeValues: { ":blogUrl": blogUrl },
      });

      const { Items: sectionItems } = await client.send(queryCommand);

      const sections = (sectionItems || []).map(s => ({
        order: Number(s.order.N),
        subheading: s.subheading as string,
        paragraph: s.paragraph as string,
        imgKey: s.imgKey as string,
      }));

      return {
        blogUrl,
        title: item.title as string,
        author: item.author as string,
        category: item.category as string,
        createdAt: item.createdAt as string,
        updatedAt: item.updatedAt as string,
        sections,
      };
    })
  );

  return {
    posts,
    nextToken: LastEvaluatedKey ? JSON.stringify(LastEvaluatedKey) : null,
  };
}

/**
 * It returns a single post with its all sections.
 */

export async function getPostWithSections(blogUrl: string): Promise<PostWithSections | undefined> {
  const { Item: post } = await dynamoClient.send(
    new GetCommand({
      TableName: POSTS_TABLE,
      Key: { blogUrl }
    })
  )
  if (!post) return undefined;
  
  const { Items: sectionsItems } = await dynamoClient.send(
    new QueryCommand({
      TableName: SECTIONS_TABLE,
      KeyConditionExpression: "blogUrl = :blogUrl",
      ExpressionAttributeValues: { ":blogUrl": blogUrl }
    })
  )

  const sections = sectionsItems?.map(s => ({
    order: Number(s.order.N),
    subheading: s.subheading as string,
    paragraph: s.paragraph as string,
    imgKey: s.imgKey as string,
  })) as Section[];

  return {
    blogUrl,
    title: post?.title as string,
    author: post?.author as string,
    category: post?.category as string,
    createdAt: post?.createdAt as string,
    updatedAt: post?.updatedAt as string,
    sections,
  };
}