import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tours/${tour.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-64 w-full">
          <Image
            src={tour.images[0] || "/placeholder.jpg"}
            alt={tour.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-[var(--brand-2)] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {tour.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {tour.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {tour.duration}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-[var(--brand-2)]">
                {tour.currency === "NPR" ? "₨" : "$"}{tour.price}
              </span>
              <span className="text-gray-600 text-sm"> / person</span>
            </div>
            <span className="text-[var(--brand-2)] font-semibold hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
