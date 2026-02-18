"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogs, updateBlog, createBlog } from "@/lib/mockServices";
import type { Blog } from "@/types";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import Toast from "@/components/admin/Toast";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AdminBlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const isNew = blogId === "new";

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    isPublished: false,
    author: "",
    images: [],
    tags: [],
    category: "",
    readTime: "",
    views: 0,
    featured: false,
    customStyles: {},
  });
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" | "info" | "warning" }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!isNew) {
      loadBlog();
    }
  }, [blogId]);

  const loadBlog = async () => {
    setIsLoading(true);
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b.id === blogId);
    if (blog) {
      setFormData({
        ...blog,
        customStyles: blog.customStyles || {},
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isNew) {
        await createBlog(formData as Omit<Blog, "id" | "createdAt">);
        showToast("Blog created successfully!", "success");
      } else {
        await updateBlog(blogId, formData);
        showToast("Blog updated successfully!", "success");
      }
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1000);
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast("Error saving blog. Please try again.", "error");
      setIsSaving(false);
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ isVisible: true, message, type });
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updates: Partial<Blog> = { [name]: value };

    if (name === "title" && autoGenerateSlug && isNew) {
      updates.slug = generateSlug(value);
    }

    if (name.startsWith("customStyles.")) {
      const styleKey = name.replace("customStyles.", "") as keyof Blog["customStyles"];
      setFormData((prev) => ({
        ...prev,
        customStyles: {
          ...prev.customStyles,
          [styleKey]: value || undefined,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  if (isLoading && !isNew) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {isNew ? "Create New Blog" : "Edit Blog"}
        </h1>
        <Button href="/admin/blogs" variant="secondary">
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              {isNew && (
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={autoGenerateSlug}
                    onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                    className="w-3 h-3"
                  />
                  Auto-generate
                </label>
              )}
            </div>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              disabled={autoGenerateSlug && isNew}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Category</option>
              <option value="Travel Tips">Travel Tips</option>
              <option value="Culture">Culture</option>
              <option value="Trekking">Trekking</option>
              <option value="Adventure">Adventure</option>
              <option value="News">News</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              name="coverImage"
              required
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="5 min read"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Views
            </label>
            <input
              type="number"
              name="views"
              value={formData.views || 0}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, views: Number(e.target.value) }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Published</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-600"
              />
              <span className="ml-2 text-sm text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            placeholder="Brief summary of the blog post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content * (Rich Text Editor)
          </label>
          <RichTextEditor
            value={formData.content || ""}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            placeholder="Write your blog content here. Use the toolbar above for formatting."
          />
          <p className="mt-2 text-sm text-gray-500">
            Use the toolbar above to format your content. Supports bold, italic, headings, lists, links, and images.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Images (Gallery)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Image
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images?.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Custom Styling (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Font Size
              </label>
              <input
                type="text"
                name="customStyles.titleFontSize"
                value={formData.customStyles?.titleFontSize || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., 3rem, 48px"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.customStyles?.titleColor || "#000000"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        titleColor: e.target.value,
                      },
                    }))
                  }
                  className="w-16 h-10 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={formData.customStyles?.titleColor || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        titleColor: e.target.value,
                      },
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="#000000 or color name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Font Size
              </label>
              <input
                type="text"
                name="customStyles.contentFontSize"
                value={formData.customStyles?.contentFontSize || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., 1.125rem, 18px"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.customStyles?.contentColor || "#374151"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        contentColor: e.target.value,
                      },
                    }))
                  }
                  className="w-16 h-10 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={formData.customStyles?.contentColor || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        contentColor: e.target.value,
                      },
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="#374151 or color name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.customStyles?.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        backgroundColor: e.target.value,
                      },
                    }))
                  }
                  className="w-16 h-10 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={formData.customStyles?.backgroundColor || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customStyles: {
                        ...prev.customStyles,
                        backgroundColor: e.target.value,
                      },
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="#ffffff or transparent"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Leave empty to use default styles. Colors can be hex codes (#000000) or CSS color names (black, white, etc.)
          </p>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isNew ? "Create Blog" : "Save Changes"}
          </Button>
          <Button href="/admin/blogs" variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </form>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
