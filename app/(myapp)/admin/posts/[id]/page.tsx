// "use client"
import dbConnect from "@/app/dbConnect";
import PostModel from "@/app/models/post";
import { notFound } from "next/navigation";
import { BackButton } from "@/app/components/backbutton";
import AuthorInfo from "@/app/components/authorinfo";

const getPost = async (id: string) => {
  try {
    await dbConnect();
    const post = await PostModel.findById(id).lean();
    if (!post) return null;

    // Convert MongoDB Date to JavaScript Date
    if (post.createdAt) {
      post.createdAt = new Date(post.createdAt);
    }

    // Remove Mongoose internals if any
    const { _id, createdAt, updatedAt, ...rest } = post;
    return {
      id: _id?.toString(),
      createdAt: createdAt ? new Date(createdAt).toISOString() : null,
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
      ...rest,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);
  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <BackButton/>
      </div>

      {/* Post header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 gap-4">
          <AuthorInfo/>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Post content */}
      <article className="prose prose-lg max-w-none dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </div>
  );
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 160),
      type: 'article',
      // publishedTime: post.time?.toISOString(),
      authors: [post.author || 'Anonymous'],
    },
  };
};

export default Page;
