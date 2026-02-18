import type { Tour, Blog, HomepageData } from "@/types";
import {
  mockTours,
  mockBlogs,
  mockHomepageData,
} from "./mockData";

export async function getTours(): Promise<Tour[]> {
  return Promise.resolve(mockTours);
}

export async function getPublishedTours(): Promise<Tour[]> {
  return Promise.resolve(mockTours.filter((tour) => tour.isPublished));
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tour = mockTours.find((t) => t.slug === slug);
  return Promise.resolve(tour || null);
}

export async function getToursByCategory(
  category: string
): Promise<Tour[]> {
  if (category === "All") {
    return getPublishedTours();
  }
  return Promise.resolve(
    mockTours.filter(
      (tour) => tour.category === category && tour.isPublished
    )
  );
}

export async function getBlogs(): Promise<Blog[]> {
  return Promise.resolve(mockBlogs);
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  return Promise.resolve(mockBlogs.filter((blog) => blog.isPublished));
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blog = mockBlogs.find((b) => b.slug === slug);
  return Promise.resolve(blog || null);
}

export async function getHomepageData(): Promise<HomepageData> {
  return Promise.resolve(mockHomepageData);
}

export async function createTour(tour: Omit<Tour, "id" | "createdAt">): Promise<Tour> {
  const newTour: Tour = {
    ...tour,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  mockTours.push(newTour);
  return Promise.resolve(newTour);
}

export async function updateTour(
  id: string,
  updates: Partial<Tour>
): Promise<Tour | null> {
  const index = mockTours.findIndex((t) => t.id === id);
  if (index === -1) return Promise.resolve(null);
  mockTours[index] = { ...mockTours[index], ...updates };
  return Promise.resolve(mockTours[index]);
}

export async function deleteTour(id: string): Promise<boolean> {
  const index = mockTours.findIndex((t) => t.id === id);
  if (index === -1) return Promise.resolve(false);
  mockTours.splice(index, 1);
  return Promise.resolve(true);
}

export async function createBlog(blog: Omit<Blog, "id" | "createdAt">): Promise<Blog> {
  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  mockBlogs.push(newBlog);
  return Promise.resolve(newBlog);
}

export async function updateBlog(
  id: string,
  updates: Partial<Blog>
): Promise<Blog | null> {
  const index = mockBlogs.findIndex((b) => b.id === id);
  if (index === -1) return Promise.resolve(null);
  mockBlogs[index] = { ...mockBlogs[index], ...updates };
  return Promise.resolve(mockBlogs[index]);
}

export async function deleteBlog(id: string): Promise<boolean> {
  const index = mockBlogs.findIndex((b) => b.id === id);
  if (index === -1) return Promise.resolve(false);
  mockBlogs.splice(index, 1);
  return Promise.resolve(true);
}

export async function getDashboardStats() {
  return Promise.resolve({
    toursCount: mockTours.length,
    blogsCount: mockBlogs.length,
    messagesCount: 12,
    publishedToursCount: mockTours.filter((t) => t.isPublished).length,
    publishedBlogsCount: mockBlogs.filter((b) => b.isPublished).length,
  });
}
