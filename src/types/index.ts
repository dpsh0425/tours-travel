export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: string;
  duration: string;
  price: number;
  currency?: "USD" | "NPR"; // Currency for price display
  highlights: string[];
  itinerary: ItineraryDay[];
  images: string[];
  isPublished: boolean;
  createdAt: string;
  description?: string;
  // Optional additional sections - all manageable by admin
  whatsIncluded?: string[];
  whatsExcluded?: string[];
  importantInfo?: ImportantInfo[];
  cancellationPolicy?: string;
  faq?: FAQ[];
  similarTours?: string[]; // Tour IDs
  difficulty?: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  maxAltitude?: string;
  groupSize?: string;
  bestTime?: string;
  // Rich content fields
  detailedDescription?: string; // Rich HTML content
  preparationGuide?: string; // Rich HTML content
  whatToExpect?: string; // Rich HTML content
  reviews?: TourReview[];
  customStyles?: {
    titleColor?: string;
    titleFontSize?: string;
    backgroundColor?: string;
  };
}

export interface TourReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ImportantInfo {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage: string;
  isPublished: boolean;
  createdAt: string;
  author?: string;
  // Enhanced features
  images?: string[]; // Multiple images for gallery
  tags?: string[];
  readTime?: string;
  views?: number;
  category?: string;
  featured?: boolean;
  // Custom styling (optional)
  customStyles?: {
    titleFontSize?: string;
    titleColor?: string;
    contentFontSize?: string;
    contentColor?: string;
    backgroundColor?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  image?: string;
}

export interface HomepageData {
  hero: HeroSection;
  featuredTours: string[];
  testimonials: Testimonial[];
  enabledSections: {
    hero: boolean;
    featuredTours: boolean;
    bestSelling: boolean;
    whyChooseUs: boolean;
    testimonials: boolean;
    blogPreview: boolean;
    aboutUs: boolean;
    popularDestinations: boolean;
    travelTips: boolean;
    newsletter: boolean;
    faq: boolean;
  };
  aboutUs?: AboutUsSection;
  popularDestinations?: Destination[];
  travelTips?: TravelTip[];
  faq?: FAQ[];
}

export interface AboutUsSection {
  title: string;
  description: string;
  image?: string;
  stats?: { label: string; value: string }[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
}

export interface TravelTip {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
