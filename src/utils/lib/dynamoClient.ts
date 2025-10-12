import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_ID!
    }
})

export const dynamoClient = DynamoDBDocumentClient.from(client);