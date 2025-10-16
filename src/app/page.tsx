import PostsGrid from "@/components/PostsGrid";
import { getPostsWithSections } from "@/utils/lib/getPosts";


export default async function HomePage() {
  const { posts, nextToken } = await getPostsWithSections(10);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <PostsGrid
        initialPosts={posts}
        initialNextToken={nextToken}
      />
    </main>
  );
}
