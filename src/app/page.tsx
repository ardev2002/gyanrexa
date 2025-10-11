import PostsGrid from "@/components/PostsGrid";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { getPostsWithSections } from "@/utils/lib/getPosts";


export default async function HomePage() {
  const { posts, nextToken } = await getPostsWithSections(dynamoClient, 10);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <PostsGrid
        initialPosts={posts}
        initialNextToken={nextToken}
      />
    </main>
  );
}
