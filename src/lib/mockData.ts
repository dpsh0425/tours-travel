import type {
  Tour,
  Blog,
  Testimonial,
  HomepageData,
  WhyChooseUs,
  Destination,
  TravelTip,
  FAQ as FAQType,
} from "@/types";

export const mockTours: Tour[] = [
  {
    id: "1",
    title: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    category: "Trekking",
    duration: "14 Days",
    price: 1299,
    currency: "USD",
    highlights: [
      "Stunning views of Mount Everest",
      "Sherpa culture and villages",
      "Tengboche Monastery",
      "Kala Patthar summit",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal. Transfer to hotel and briefing.",
      },
      {
        day: 2,
        title: "Fly to Lukla, Trek to Phakding",
        description: "Scenic flight to Lukla and start trekking.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200",
    ],
    isPublished: true,
    createdAt: "2024-01-15T00:00:00Z",
    description:
      "Experience the ultimate Himalayan adventure on this classic trek to the foot of Mount Everest. Walk through Sherpa villages, visit ancient monasteries, and stand face to face with the highest peaks on earth.",
    difficulty: "Challenging",
    maxAltitude: "5,545m (Kala Patthar)",
    groupSize: "2-12 people",
    bestTime: "March-May, September-November",
    whatsIncluded: [
      "Airport transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "Accommodation in tea houses",
      "All meals during trek",
      "Experienced guide and porter",
      "TIMS and Sagarmatha National Park permits",
      "First aid kit",
    ],
    whatsExcluded: [
      "International flights",
      "Nepal visa fees",
      "Travel insurance",
      "Personal trekking equipment",
      "Tips for guide and porter",
      "Alcoholic beverages",
    ],
    importantInfo: [
      {
        title: "Visa Requirements",
        description: "Most nationalities can obtain a visa on arrival at Kathmandu airport. Bring 2 passport photos and USD cash.",
      },
      {
        title: "Travel Insurance",
        description: "Comprehensive travel insurance covering high-altitude trekking up to 6,000m is mandatory.",
      },
      {
        title: "Fitness Level",
        description: "This trek requires good physical fitness. We recommend regular cardio exercise and hiking practice before departure.",
      },
      {
        title: "Altitude Sickness",
        description: "Our itinerary includes acclimatization days. Guides are trained in recognizing and managing altitude-related issues.",
      },
    ],
    cancellationPolicy:
      "Cancellations made 30+ days before departure: 80% refund. 15-29 days: 50% refund. Less than 15 days: No refund. Full refund if trip is cancelled by us due to weather or safety concerns.",
    faq: [
      {
        question: "How difficult is the Everest Base Camp trek?",
        answer: "The trek is challenging but achievable for anyone in good physical condition. Daily walking is 5-7 hours on varied terrain. The main challenge is altitude, which we manage through a gradual ascent schedule.",
      },
      {
        question: "What is the accommodation like?",
        answer: "We stay in local tea houses along the route. Rooms are basic but clean, with shared bathrooms at higher elevations. Hot showers and charging facilities are available (sometimes for a small fee).",
      },
      {
        question: "Will I get altitude sickness?",
        answer: "Altitude affects everyone differently. Our itinerary includes rest days for acclimatization, and our guides monitor everyone closely. Most people adjust well with proper hydration and gradual ascent.",
      },
      {
        question: "What should I pack?",
        answer: "We provide a detailed packing list upon booking. Essentials include good trekking boots, warm layers, sleeping bag, and daypack. Many items can be rented in Kathmandu if needed.",
      },
    ],
    similarTours: ["2"],
  },
  {
    id: "2",
    title: "Annapurna Circuit Trek",
    slug: "annapurna-circuit-trek",
    category: "Trekking",
    duration: "18 Days",
    price: 1199,
    currency: "USD",
    highlights: [
      "Complete Annapurna circuit",
      "Thorong La Pass",
      "Diverse landscapes",
      "Traditional villages",
    ],
    itinerary: [
      {
        day: 1,
        title: "Drive to Besisahar",
        description: "Scenic drive through the hills.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    ],
    isPublished: true,
    createdAt: "2024-01-20T00:00:00Z",
    description:
      "Circle the entire Annapurna massif on one of the world's most iconic trekking routes. Cross the legendary Thorong La Pass and experience everything from lush valleys to high-altitude desert.",
    difficulty: "Challenging",
    maxAltitude: "5,416m (Thorong La Pass)",
    groupSize: "2-12 people",
    bestTime: "March-May, September-November",
    whatsIncluded: [
      "All ground transportation",
      "Accommodation in tea houses",
      "All meals during trek",
      "Experienced guide and porter",
      "ACAP and TIMS permits",
      "First aid kit",
    ],
    whatsExcluded: [
      "International flights",
      "Nepal visa fees",
      "Travel insurance",
      "Personal equipment",
      "Tips",
      "Alcoholic beverages",
    ],
    similarTours: ["1"],
  },
  {
    id: "3",
    title: "Chitwan National Park Safari",
    slug: "chitwan-national-park-safari",
    category: "Safari",
    duration: "3 Days",
    price: 399,
    currency: "USD",
    highlights: [
      "Jungle safari",
      "Wildlife spotting",
      "Elephant ride",
      "Bird watching",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Jungle Walk",
        description: "Arrive and explore the jungle.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    ],
    isPublished: true,
    createdAt: "2024-02-01T00:00:00Z",
    description:
      "Slow down and immerse yourself in the jungles of southern Nepal. Explore Chitwan National Park on jeep safaris, river cruises, and jungle walks in search of rhinos, crocodiles, and exotic birdlife.",
  },
];

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Best Time to Visit Nepal for Trekking",
    slug: "best-time-to-visit-nepal-for-trekking",
    content: `
      <p>Nepal offers world-class trekking almost year-round, but two main trekking seasons stand out above the rest: spring and autumn. Choosing the right time will shape your entire experience.</p>
      <h2>Spring Season (March – May)</h2>
      <p>Spring brings mild temperatures, longer days, and hillsides covered in blooming rhododendrons. Mountain views are often crystal clear in the mornings, with slightly hazier afternoons.</p>
      <ul>
        <li>Perfect for photographers and nature lovers</li>
        <li>Comfortable daytime temperatures at most elevations</li>
        <li>Ideal for popular routes such as Everest Base Camp and Annapurna Base Camp</li>
      </ul>
      <h2>Autumn Season (September – November)</h2>
      <p>After the summer monsoon, the air is washed clean, skies are deep blue, and trails are in excellent condition. This is considered the peak trekking season in Nepal.</p>
      <ul>
        <li>Best overall visibility and mountain views</li>
        <li>Stable weather and fewer chances of rain or snowfall</li>
        <li>Great for high passes and longer expeditions</li>
      </ul>
      <h2>Other Times of the Year</h2>
      <p>Winter and monsoon can also be rewarding with the right expectations. Winter brings quiet trails and crisp air at lower elevations, while monsoon offers lush greenery in rain-shadow regions like Mustang.</p>
      <p>Not sure when to come? Our travel experts can help you match the best season to your trekking experience and fitness level.</p>
    `,
    excerpt:
      "Discover the best seasons for trekking in Nepal and plan your perfect adventure.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    isPublished: true,
    createdAt: "2024-01-10T00:00:00Z",
    author: "Travel Expert",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    ],
    tags: ["Trekking", "Seasons", "Planning"],
    readTime: "5 min read",
    views: 1250,
    category: "Travel Tips",
    featured: true,
  },
  {
    id: "2",
    title: "Essential Packing List for Nepal Trekking",
    slug: "essential-packing-list-for-nepal-trekking",
    content: `
      <p>Packing smart will keep you comfortable, safe, and light on your feet in the Himalayas. Use this checklist as a starting point and tailor it to your specific route and season.</p>
      <h2>Clothing Layers</h2>
      <p>Think in layers so you can adapt quickly to changing temperatures.</p>
      <ul>
        <li><strong>Base layers:</strong> Moisture-wicking tops and thermal leggings</li>
        <li><strong>Mid layers:</strong> Fleece or light down jacket for insulation</li>
        <li><strong>Outer shell:</strong> Waterproof and windproof jacket and pants</li>
        <li><strong>Accessories:</strong> Warm hat, sun hat, buff, and gloves</li>
      </ul>
      <h2>Footwear & Accessories</h2>
      <p>Your feet are your engine on the trail. Invest in them.</p>
      <ul>
        <li>Sturdy, broken‑in trekking boots with good ankle support</li>
        <li>Lightweight camp shoes or sandals</li>
        <li>Technical trekking socks (and a few spare pairs)</li>
        <li>Trekking poles for long descents and high passes</li>
      </ul>
      <h2>Essential Gear</h2>
      <ul>
        <li>Sleeping bag rated for the season and altitude</li>
        <li>Daypack (25–35L) with rain cover</li>
        <li>Reusable water bottles and purification method</li>
        <li>Basic first-aid kit and any personal medications</li>
      </ul>
      <p>If you prefer to travel lighter, many items can be rented or purchased once you arrive in Kathmandu. Our team will gladly advise you based on your chosen trek.</p>
    `,
    excerpt:
      "Everything you need to pack for a comfortable and safe trekking adventure in Nepal.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    isPublished: true,
    createdAt: "2024-01-25T00:00:00Z",
    author: "Travel Expert",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200",
    ],
    tags: ["Packing", "Gear", "Preparation"],
    readTime: "7 min read",
    views: 980,
    category: "Travel Tips",
    featured: false,
  },
  {
    id: "3",
    title: "Sherpa Culture and Traditions in the Himalayas",
    slug: "sherpa-culture-and-traditions",
    content: `
      <p>The Sherpa people are an integral part of the Everest region, known worldwide for their mountaineering expertise and warm hospitality. Understanding their culture enriches any trekking experience.</p>
      <h2>History and Heritage</h2>
      <p>Sherpas migrated from Tibet to the Solu-Khumbu region of Nepal over 500 years ago. They brought with them Tibetan Buddhism, which remains central to their identity today.</p>
      <h2>Religious Practices</h2>
      <p>Buddhist monasteries dot the landscape, with Tengboche Monastery being one of the most significant. Visitors are welcome to observe prayer ceremonies and learn about Buddhist philosophy.</p>
      <h2>Traditional Lifestyle</h2>
      <p>Many Sherpas still maintain traditional practices including yak herding, farming, and trade. The younger generation often combines these traditions with modern opportunities in tourism.</p>
    `,
    excerpt:
      "Discover the rich cultural heritage of the Sherpa people and their deep connection to the Himalayas.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    isPublished: true,
    createdAt: "2024-02-05T00:00:00Z",
    author: "Cultural Expert",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    ],
    tags: ["Culture", "Sherpa", "Traditions"],
    readTime: "4 min read",
    views: 650,
    category: "Culture",
    featured: false,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
    comment:
      "The Everest Base Camp trek was absolutely incredible! The guides were knowledgeable and the scenery was breathtaking. Highly recommend!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Australia",
    rating: 5,
    comment:
      "Best travel experience of my life. The Annapurna Circuit exceeded all expectations. Professional team and amazing support throughout.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "3",
    name: "Emma Williams",
    location: "United Kingdom",
    rating: 5,
    comment:
      "Outstanding service from start to finish. The Chitwan safari was magical, and we saw so much wildlife. Will definitely return!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
];

export const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Everest Region",
    description: "Home to the world's highest peak and legendary Sherpa culture",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    link: "/tours?category=Trekking",
  },
  {
    id: "2",
    name: "Annapurna Region",
    description: "Diverse landscapes from subtropical forests to high-altitude passes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    link: "/tours?category=Trekking",
  },
  {
    id: "3",
    name: "Chitwan National Park",
    description: "Jungle safaris and wildlife encounters in Nepal's Terai",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    link: "/tours?category=Safari",
  },
  {
    id: "4",
    name: "Kathmandu Valley",
    description: "Ancient temples, palaces, and rich cultural heritage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    link: "/tours?category=Cultural",
  },
];

export const mockTravelTips: TravelTip[] = [
  {
    id: "1",
    title: "Best Time to Visit",
    description: "Spring (March-May) and Autumn (September-November) offer the best weather and mountain views.",
    icon: "📅",
  },
  {
    id: "2",
    title: "Altitude Acclimatization",
    description: "Take it slow, stay hydrated, and listen to your body. Our guides ensure proper acclimatization.",
    icon: "⛰️",
  },
  {
    id: "3",
    title: "Cultural Respect",
    description: "Dress modestly, remove shoes at temples, and always ask before taking photos of locals.",
    icon: "🙏",
  },
  {
    id: "4",
    title: "Travel Insurance",
    description: "Essential for high-altitude treks. Ensure coverage up to 6,000m altitude.",
    icon: "🛡️",
  },
];

export const mockHomepageFAQ: FAQType[] = [
  {
    question: "Do I need a visa to visit Nepal?",
    answer: "Yes, most nationalities require a visa. You can obtain it on arrival at Kathmandu airport (bring 2 passport photos and USD cash) or apply online in advance.",
  },
  {
    question: "What is the best time to trek in Nepal?",
    answer: "The best trekking seasons are spring (March-May) and autumn (September-November) when weather is stable and mountain views are clearest.",
  },
  {
    question: "How difficult are the treks?",
    answer: "We offer treks for all fitness levels, from easy cultural walks to challenging high-altitude expeditions. Each tour description includes difficulty level and fitness requirements.",
  },
  {
    question: "What is included in the tour price?",
    answer: "Typically included: accommodation, meals during trek, guide and porter, permits, and ground transportation. International flights and travel insurance are usually excluded.",
  },
];

export const mockHomepageData: HomepageData = {
  hero: {
    title: "Discover the Magic of Nepal",
    subtitle: "Adventure, Culture, and Unforgettable Experiences",
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    ctaText: "Explore Tours",
    ctaLink: "/tours",
  },
  featuredTours: ["1", "2"],
  testimonials: mockTestimonials,
  enabledSections: {
    hero: true,
    featuredTours: true,
    bestSelling: true,
    whyChooseUs: true,
    testimonials: true,
    blogPreview: true,
    aboutUs: true,
    popularDestinations: true,
    travelTips: true,
    newsletter: true,
    faq: true,
  },
  aboutUs: {
    title: "Your Trusted Partner for Nepal Adventures",
    description:
      "With over 15 years of experience, we've helped thousands of travelers discover the magic of Nepal. From epic treks to cultural immersions, we craft authentic experiences that respect local communities and the environment. Our team of local guides and travel experts ensures every journey is safe, memorable, and transformative.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    stats: [
      { label: "Happy Travelers", value: "10,000+" },
      { label: "Years Experience", value: "15+" },
      { label: "Tours Offered", value: "50+" },
      { label: "Expert Guides", value: "100+" },
    ],
  },
  popularDestinations: mockDestinations,
  travelTips: mockTravelTips,
  faq: mockHomepageFAQ,
};

export const mockWhyChooseUs: WhyChooseUs[] = [
  {
    id: "1",
    title: "Expert Guides",
    description:
      "Our experienced local guides ensure your safety and enrich your journey with cultural insights.",
  },
  {
    id: "2",
    title: "Best Prices",
    description:
      "Competitive pricing with no hidden costs. We offer the best value for your adventure.",
  },
  {
    id: "3",
    title: "24/7 Support",
    description:
      "Round-the-clock customer support before, during, and after your trip.",
  },
  {
    id: "4",
    title: "Sustainable Tourism",
    description:
      "We are committed to responsible travel that benefits local communities.",
  },
];

export const tourCategories = [
  "All",
  "Trekking",
  "Safari",
  "Cultural",
  "Adventure",
  "Spiritual",
];
