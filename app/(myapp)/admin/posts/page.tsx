import dbConnect from "@/app/dbConnect";
import PostModel from "@/app/models/post";
import Link from "next/link";

const PostsPage = async () => {
  await dbConnect();
  const posts = await PostModel.find().sort({ createdAt: -1 });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link
            href={`/admin/posts/${post.id}`}
            key={post.id}
            className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.body}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {post.createdAt?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                  View
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found</p>
          <Link 
            href="/admin/posts/create" 
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
