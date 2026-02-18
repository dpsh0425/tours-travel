import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/mockServices";
import BlogCard from "@/components/BlogCard";
import type { Metadata } from "next";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Nepal Travel & Trek Blog`,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const allBlogs = await getPublishedBlogs();

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs
    .filter(
      (b) =>
        b.id !== blog.id &&
        (b.category === blog.category ||
          b.tags?.some((tag) => blog.tags?.includes(tag)))
    )
    .slice(0, 3);

  const customStyles = blog.customStyles || {};

  return (
    <article>
      <div className="relative h-[400px] md:h-[600px] mb-8">
        <Image
          src={blog.coverImage || "/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            {blog.category && (
              <span className="inline-block px-3 py-1 bg-[var(--brand-2)] rounded-full text-sm font-semibold mb-4">
                {blog.category}
              </span>
            )}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{
                fontSize: customStyles.titleFontSize,
                color: customStyles.titleColor,
              }}
            >
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-200">
              {blog.author && (
                <>
                  <span>By {blog.author}</span>
                  <span>•</span>
                </>
              )}
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {blog.readTime && (
                <>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </>
              )}
              {blog.views && (
                <>
                  <span>•</span>
                  <span>{blog.views} views</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none mb-12"
          style={{
            fontSize: customStyles.contentFontSize,
            color: customStyles.contentColor,
            backgroundColor: customStyles.backgroundColor,
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.images && blog.images.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blog.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${blog.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedBlogs.length > 0 && (
          <section className="py-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
