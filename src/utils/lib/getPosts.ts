import {
  ScanCommand,
  QueryCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

const POSTS_TABLE = "Posts";
const SECTIONS_TABLE = "Sections";

export async function getPostsWithSections(
  client: DynamoDBClient,
  limit = 10,
  nextToken?: string
) {
  // 1️⃣ Fetch posts
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
        ExpressionAttributeValues: { ":blogUrl": { S: blogUrl! } },
      });

      const { Items: sectionItems } = await client.send(queryCommand);

      const sections = (sectionItems || []).map((s) => ({
        order: Number(s.order.N),
        subheading: s.subheading?.S as string,
        paragraph: s.paragraph?.S as string,
        imgUrl: s.imgUrl?.S as string,
      }));

      return {
        blogUrl,
        title: item.title?.S as string,
        author: item.author?.S as string,
        category: item.category?.S as string,
        createdAt: item.createdAt?.S as string,
        sections,
      };
    })
  );

  return {
    posts,
    nextToken: LastEvaluatedKey
      ? JSON.stringify(LastEvaluatedKey)
      : null,
  };
}
