import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourBySlug, getPublishedTours } from "@/lib/mockServices";
import Button from "@/components/Button";
import TourCard from "@/components/TourCard";
import type { Metadata } from "next";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.title} | Nepal Travel & Trek`,
    description: tour.description || `Book ${tour.title} - ${tour.duration} adventure tour in Nepal.`,
  };
}

export default async function TourDetailPage({
  params,
}: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const allTours = await getPublishedTours();

  if (!tour) {
    notFound();
  }

  const similarTours = tour.similarTours
    ? allTours.filter((t) => tour.similarTours?.includes(t.id) && t.id !== tour.id)
    : allTours.filter((t) => t.category === tour.category && t.id !== tour.id).slice(0, 3);

  return (
    <div>
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={tour.images[0] || "/placeholder.jpg"}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center gap-4 text-lg">
            <span>{tour.duration}</span>
            <span>•</span>
            <span>{tour.category}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {tour.description && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </section>
            )}

            {tour.detailedDescription && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Detailed Description</h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: tour.detailedDescription }}
                />
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-2">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-[var(--brand-2)] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {tour.whatToExpect && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: tour.whatToExpect }}
                />
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-[var(--brand-2)] pl-4">
                    <h3 className="font-semibold text-lg mb-1">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-gray-700">{day.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {tour.preparationGuide && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Preparation Guide</h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: tour.preparationGuide }}
                />
              </section>
            )}

            {tour.images.length > 1 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${tour.title} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(tour.whatsIncluded || tour.whatsExcluded) && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What's Included & Excluded</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.whatsIncluded && tour.whatsIncluded.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.whatsIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.whatsExcluded && tour.whatsExcluded.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-red-700 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Excluded
                      </h3>
                      <ul className="space-y-2">
                        {tour.whatsExcluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-600 mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {tour.importantInfo && tour.importantInfo.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Important Information</h2>
                <div className="space-y-4">
                  {tour.importantInfo.map((info, index) => (
                    <div key={index} className="bg-blue-50 border-l-4 border-[var(--brand-2)] p-4 rounded">
                      <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                      <p className="text-gray-700">{info.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tour.faq && tour.faq.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {tour.faq.map((faq, index) => (
                    <details
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg cursor-pointer"
                    >
                      <summary className="font-semibold mb-2 list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <svg
                          className="w-5 h-5 text-[var(--brand-2)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <p className="text-gray-700 mt-3">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {tour.cancellationPolicy && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: tour.cancellationPolicy }}
                  />
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-bold text-[var(--brand-2)] mb-1">
                  {tour.currency === "NPR" ? "₨" : "$"}{tour.price}
                </div>
                <div className="text-gray-600">per person</div>
              </div>
              <Button href="/contact" className="w-full mb-4">
                Book Now
              </Button>
              <Button href="/contact" variant="secondary" className="w-full">
                Contact Us
              </Button>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold">{tour.category}</span>
                  </div>
                  {tour.difficulty && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-semibold">{tour.difficulty}</span>
                    </div>
                  )}
                  {tour.maxAltitude && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Altitude:</span>
                      <span className="font-semibold">{tour.maxAltitude}</span>
                    </div>
                  )}
                  {tour.groupSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-semibold">{tour.groupSize}</span>
                    </div>
                  )}
                  {tour.bestTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-semibold">{tour.bestTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similarTours.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Similar Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarTours.map((similarTour) => (
                <TourCard key={similarTour.id} tour={similarTour} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
