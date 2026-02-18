import { getPublishedBlogs } from "@/lib/mockServices";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const categories = Array.from(
    new Set(blogs.map((blog) => blog.category).filter(Boolean))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nepal Travel Insights & Stories
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Get expert advice, detailed trekking guides, and real travel stories from the
          Himalayas. Plan smarter, trek safer, and discover hidden corners of Nepal before
          you arrive.
        </p>
      </div>

      {featuredBlogs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredBlogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 bg-[var(--brand-2)] text-white rounded-lg font-semibold hover:opacity-95 transition-colors"
          >
            All Posts
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
