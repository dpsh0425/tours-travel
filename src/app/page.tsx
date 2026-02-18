import Image from "next/image";
import Link from "next/link";
import { getHomepageData, getPublishedTours, getPublishedBlogs } from "@/lib/mockServices";
import TourCard from "@/components/TourCard";
import BlogCard from "@/components/BlogCard";
import TestimonialCard from "@/components/TestimonialCard";
import { mockWhyChooseUs } from "@/lib/mockData";
import Button from "@/components/Button";

export default async function HomePage() {
  const homepageData = await getHomepageData();
  const tours = await getPublishedTours();
  const blogs = await getPublishedBlogs();

  return (
    <div>
      {homepageData.enabledSections.hero && (
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={homepageData.hero.backgroundImage}
              alt="Nepal Mountains"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {homepageData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {homepageData.hero.subtitle}
            </p>
            <Button href={homepageData.hero.ctaLink}>
              {homepageData.hero.ctaText}
            </Button>
          </div>
        </section>
      )}

      {homepageData.enabledSections.whyChooseUs && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockWhyChooseUs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[var(--brand-2)]"
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
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.featuredTours && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Featured Tours
                </h2>
                <p className="text-gray-600 max-w-xl">
                  Start with our most popular adventures, carefully curated for first‑time
                  visitors and seasoned trekkers alike.
                </p>
              </div>
              <Link
                href="/tours"
                className="hidden md:inline-flex items-center text-[var(--brand-2)] hover:underline font-semibold"
              >
                View All Tours →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours
                .filter((tour) =>
                  homepageData.featuredTours.includes(tour.id)
                )
                .map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.bestSelling && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Best Selling Tours
                </h2>
                <p className="text-gray-600 max-w-xl">
                  These trips are guest favorites for a reason: balanced itineraries,
                  comfortable lodges, and unforgettable mountain vistas.
                </p>
              </div>
              <Link
                href="/tours"
                className="hidden md:inline-flex items-center text-[var(--brand-2)] hover:underline font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.testimonials && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Guests Say
              </h2>
              <p className="text-gray-600">
                We measure our success by the smiles at the end of each journey. Here’s
                what recent travelers shared about their time in Nepal with us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homepageData.testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.blogPreview && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  From Our Travel Blog
                </h2>
                <p className="text-gray-600 max-w-xl">
                  Stay informed with practical advice, destination inspiration, and
                  behind‑the‑scenes stories from our guides and travelers.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center text-[var(--brand-2)] hover:underline font-semibold"
              >
                View All Posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.aboutUs && homepageData.aboutUs && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {homepageData.aboutUs.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {homepageData.aboutUs.description}
                </p>
                {homepageData.aboutUs.stats && (
                  <div className="grid grid-cols-2 gap-6">
                    {homepageData.aboutUs.stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-[var(--brand-2)] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {homepageData.aboutUs.image && (
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={homepageData.aboutUs.image}
                    alt="About Us"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.popularDestinations &&
        homepageData.popularDestinations &&
        homepageData.popularDestinations.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Popular Destinations
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore Nepal's most iconic regions, each offering unique
                  experiences and breathtaking landscapes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {homepageData.popularDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    href={destination.link || "#"}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--brand-2)] transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {destination.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      {homepageData.enabledSections.travelTips &&
        homepageData.travelTips &&
        homepageData.travelTips.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Travel Tips & Insights
                </h2>
                <p className="text-gray-600">
                  Essential advice to help you prepare for your Nepal adventure
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {homepageData.travelTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {tip.icon && (
                      <div className="text-4xl mb-4">{tip.icon}</div>
                    )}
                    <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {homepageData.enabledSections.newsletter && (
        <section className="py-16 bg-[var(--brand-2)] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-white/80 mb-8">
                Subscribe to our newsletter for travel tips, special offers, and
                the latest updates from Nepal.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button
                  type="submit"
                  className="bg-white text-[var(--brand-2)] hover:bg-white/90"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {homepageData.enabledSections.faq &&
        homepageData.faq &&
        homepageData.faq.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-600">
                    Everything you need to know about traveling to Nepal
                  </p>
                </div>
                <div className="space-y-4">
                  {homepageData.faq.map((faq, index) => (
                    <details
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                    >
                      <summary className="font-semibold text-lg mb-2 list-none flex items-center justify-between">
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
                      <p className="text-gray-700 mt-4">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
    </div>
  );
}
