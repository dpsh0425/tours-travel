# Nepal Travel & Trek Website

A professional travel and trekking website built with Next.js 14+, TypeScript, and Tailwind CSS. Features a Firebase-powered Admin CMS for content management.

## 🚀 Features

### Public Website
- **Home Page**: Hero section, featured tours, best selling tours, why choose us, testimonials, blog preview
- **Tours**: Category-based tour listing and detailed tour pages
- **Blog**: Blog listing and individual blog post pages
- **Contact**: Contact form with WhatsApp CTA and Google Maps integration

### Admin Panel (`/admin`)
- **Dashboard**: Overview statistics and quick actions
- **Tours Management**: Full CRUD operations for tours
- **Blogs Management**: Full CRUD operations for blog posts
- **Settings**: Homepage section controls (to be implemented)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (to be integrated)
  - Firebase Authentication
  - Firestore Database
- **Image Hosting**: ImageBB (to be integrated)

## 📁 Project Structure

```
nepal-travel-website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin panel pages
│   │   ├── blog/         # Blog pages
│   │   ├── tours/        # Tour pages
│   │   ├── contact/      # Contact page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/       # Reusable UI components
│   ├── lib/              # Services and utilities
│   │   ├── mockData.ts   # Mock data
│   │   └── mockServices.ts # Mock service functions
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Development Notes

### Current Status
- ✅ UI and components complete
- ✅ Mock data and services implemented
- ✅ All pages and admin panel built
- ⏳ Firebase integration pending
- ⏳ ImageBB integration pending
- ⏳ Environment variables setup pending

### Mock Data
The project currently uses mock data stored in `src/lib/mockData.ts`. All service functions in `src/lib/mockServices.ts` work with this mock data. These will be replaced with Firebase calls during final integration.

### Admin Access
- Admin login page: `/admin/login`
- Admin dashboard: `/admin`
- No authentication is enforced yet (will be added with Firebase)

## 🔄 Next Steps (Integration Phase)

1. **Firebase Setup**
   - Install Firebase SDK
   - Configure Firebase project
   - Set up Firestore collections
   - Implement Firebase Authentication

2. **Environment Variables**
   - Create `.env.local` file
   - Add Firebase config
   - Add ImageBB API key

3. **Replace Mock Services**
   - Update `src/lib/mockServices.ts` to use Firebase
   - Implement real authentication
   - Connect to Firestore database

4. **ImageBB Integration**
   - Add image upload functionality
   - Replace image URL inputs with upload interface

## 📄 License

Private project - All rights reserved
