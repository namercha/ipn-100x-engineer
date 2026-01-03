import Link from 'next/link';
import blogData from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

export default function BlogPage() {
  const blogs: BlogPost[] = blogData.blogs;

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to Restaurant Finder
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Restaurant Blog</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover stories, reviews, and insights about Houston&apos;s best restaurants.
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {blog.author}</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
