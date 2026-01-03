import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogData from '@/data/blogs.json';
import restaurantData from '@/data/restaurants.json';
import { BlogPost } from '@/types/blog';
import { Restaurant } from '@/types/restaurant';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog: BlogPost | undefined = blogData.blogs.find((b: BlogPost) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const restaurant: Restaurant | undefined = restaurantData.restaurants.find(
    (r: Restaurant) => r.id === blog.restaurantId
  );

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            &larr; Back to Blog
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 mb-4">
            <span>By {blog.author}</span>
            <span>&bull;</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {restaurant && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-900">Featured Restaurant</h3>
            <p className="text-blue-800">{restaurant.name}</p>
            <p className="text-blue-600 text-sm">{restaurant.address}</p>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return blogData.blogs.map((blog: BlogPost) => ({
    slug: blog.slug,
  }));
}
