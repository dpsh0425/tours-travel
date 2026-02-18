import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="bg-[var(--text)] text-white">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Logo variant="mark" className="mb-4" href="/" />
              <p className="text-white/70 leading-relaxed">
                Premium, safety-first Himalayan experiences—treks, tours, and
                culture-led journeys across Nepal.
              </p>
              <div className="mt-5 flex gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-white/10 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  Local Experts
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-white/10 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand)]" />
                  Best Value
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    className="hover:text-white transition-colors"
                  >
                    Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Popular</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    href="/tours?category=Trekking"
                    className="hover:text-white transition-colors"
                  >
                    Trekking Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours?category=Safari"
                    className="hover:text-white transition-colors"
                  >
                    Chitwan Safari
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours?category=Cultural"
                    className="hover:text-white transition-colors"
                  >
                    Cultural Tours
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Contact</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <span className="text-white/50">Email:</span>{" "}
                  info@nepaltraveltrek.com
                </li>
                <li>
                  <span className="text-white/50">Phone:</span> +977-1-1234567
                </li>
                <li>
                  <span className="text-white/50">Location:</span> Kathmandu,
                  Nepal
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-white/60">
            <p>© {new Date().getFullYear()} Nepal Travel & Trek. All rights reserved.</p>
            <p className="text-sm">
              Crafted for modern travelers • Secure bookings • Local support
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
