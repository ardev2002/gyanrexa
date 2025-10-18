import { GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "@/utils/lib/dynamoClient";
import { CalendarDays, Dot, X } from "lucide-react";
import SectionImageRenderer from "@/components/SectionImageRenderer";
import BlogSidebar from "@/components/BlogSidebar";
import { PostWithSections, Section } from "@/type";
import { getRecentPosts } from "@/utils/lib/getRecentPosts";
import { Metadata } from "next";
import { formatDate } from "@/utils/lib/formatDate";
import extractDescription from "@/utils/lib/extractDescription";
import { getPostWithSections } from "@/utils/lib/getPosts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const slugFromUrl = (await params).id;
  const post = await getPostWithSections(slugFromUrl);
  return {
    title: `${post?.title} - GyanRexa`,
    description: extractDescription(post?.sections[0].paragraph!),
    applicationName: 'GyanRexa',
    creator: 'Ankur Rajbongshi',
    authors: [{ name: 'Ankur Rajbongshi' }, { name: 'Manabendra Nath' }],
    referrer: 'origin-when-cross-origin',
    keywords: ['blog', 'tutorial', 'thought', 'idea', 'gyanrexa', 'ankur rajbongshi', 'manabendra nath'],
    openGraph: {
      title: post?.title,
      description: extractDescription(post?.sections[0].paragraph!),
      siteName: 'GyanRexa',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${post?.sections[0].imgKey}`,
          width: 1200,
          height: 675,
        },
      ],
      locale: 'en_US',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: extractDescription(post?.sections[0].paragraph!),
      images: [`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${post?.sections[0].imgKey}`],
      creator: '@webdevankur',
    }
  }
}

export default async function Page(props: PageProps<"/blog/[id]">) {
  const slugFromUrl = (await props.params).id;
  const postRes = await dynamoClient.send(
    new GetCommand({
      TableName: "Posts",
      Key: { blogUrl: slugFromUrl },
    })
  );

  const post = postRes.Item as PostWithSections | undefined;

  if (!post) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <div className="alert alert-error shadow-lg">
          <div className="flex items-center gap-1"><X/><span>Blog not found</span></div>
        </div>
      </main>
    );
  }

  // === Fetch Sections ===
  const sectionRes = await dynamoClient.send(
    new QueryCommand({
      TableName: "Sections",
      KeyConditionExpression: "blogUrl = :b",
      ExpressionAttributeValues: {
        ":b": slugFromUrl,
      },
    })
  );

  const sections = (sectionRes.Items as Section[])?.sort((a, b) => a.order - b.order) ?? [];

  const { post: recentPosts } = await getRecentPosts();
  const recentPostsExceptCurrent = recentPosts.filter((p) => p.blogUrl !== slugFromUrl);
  const postedDate = formatDate(post.createdAt);

  const isLatest = (() => {
    const postDate = new Date(post.createdAt);
    const diffDays = Math.floor((new Date().getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 14;
  })();

  // === Render HTML ===
  return (
    <main className="w-full min-h-screen bg-white text-black dark:bg-[#1d232a] dark:text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* === Blog Post Content === */}
        <article className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

          <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-black/70 dark:text-white/70">
            <div className="flex items-center gap-2">
              <span className="font-medium">By {post.author}</span>
              {isLatest && (
                <div className="badge badge-info dark:badge-accent">LATEST</div>
              )}
            </div>
            {postedDate && (
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-black/60 dark:text-white/60"
                />
                <span>{postedDate}</span>
              </div>
            )}
          </div>

          {/* === Blog Sections === */}
          <div className="space-y-10">
            {sections.map((sec) => {
              const lines = sec.paragraph?.split("\n") || [];
              const parsed = {
                paras: [] as string[],
                listHeading: "",
                listItems: [] as string[],
              };

              for (const line of lines) {
                if (line.startsWith("#para:")) {
                  parsed.paras.push(line.replace("#para:", "").trim());
                } else if (line.startsWith("#lh:")) {
                  parsed.listHeading = line.replace("#lh:", "").trim();
                } else if (line.startsWith("#li:")) {
                  parsed.listItems.push(line.replace("#li:", "").trim());
                }
              }

              return (
                <section
                  key={sec.order}
                  className="
                  rounded-xl 
                  border border-gray-200 dark:border-gray-700 
                  shadow-sm 
                  bg-base-100 dark:bg-base-200 
                  px-6 py-8 
                  transition-colors duration-300"
                >
                  {sec.imgKey && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <SectionImageRenderer imgKey={sec.imgKey} alt={sec.subheading || post.title} />
                    </div>
                  )}

                  {sec.subheading && (
                    <h2
                      className="
              text-2xl font-semibold mb-4 
              text-gray-900 dark:text-gray-100
            "
                    >
                      {sec.subheading}
                    </h2>
                  )}

                  <div className="space-y-4 text-gray-800 dark:text-gray-300 leading-relaxed">
                    {parsed.paras.map((p, i) => (
                      <p
                        key={i}
                        className={`${i !== 0 ? 'pl-6' : ''} text-[1rem]`}
                      >
                        {p}
                      </p>
                    ))}

                    {parsed.listHeading && (
                      <h3
                        className="
                text-lg font-semibold mt-6 mb-2 
                text-gray-900 dark:text-gray-200
              "
                      >
                        {parsed.listHeading}
                      </h3>
                    )}

                    {parsed.listItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 pl-4 sm:pl-6 md:pl-8"
                      >
                        <Dot size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

        </article>

        <BlogSidebar recentPosts={recentPostsExceptCurrent} />
      </div>
    </main>
  );
}
