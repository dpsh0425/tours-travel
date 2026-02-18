import { getToursByCategory, getPublishedTours } from "@/lib/mockServices";
import TourCard from "@/components/TourCard";
import { tourCategories } from "@/lib/mockData";

interface ToursPageProps {
  searchParams: { category?: string };
}

export default async function ToursPage({
  searchParams,
}: ToursPageProps) {
  const category = searchParams.category || "All";
  const tours =
    category === "All"
      ? await getPublishedTours()
      : await getToursByCategory(category);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Nepal Tours & Trekking Packages</h1>
      <p className="text-gray-600 max-w-2xl mb-8">
        Browse our hand‑crafted collection of trekking, safari, cultural, and adventure
        tours across Nepal. Every itinerary is designed by local experts and can be
        tailored to your dates and preferences.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {tourCategories.map((cat) => (
          <a
            key={cat}
            href={`/tours${cat !== "All" ? `?category=${cat}` : ""}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              category === cat
                ? "bg-[var(--brand-2)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No tours found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
