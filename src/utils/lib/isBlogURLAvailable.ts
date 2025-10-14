import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "./dynamoClient";
import { POSTS_TABLE } from "./CONFIG";

export async function isBlogURLAvailable(blogUrl: string) {
  const postRes = await dynamoClient.send(
    new GetCommand({
      TableName: POSTS_TABLE,
      Key: { blogUrl },
    })
  );
  return !postRes.Item;
}