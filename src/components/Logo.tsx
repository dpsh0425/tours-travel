import Link from "next/link";

type LogoVariant = "full" | "mark";

export default function Logo({
  variant = "full",
  className = "",
  href = "/",
}: {
  variant?: LogoVariant;
  className?: string;
  href?: string;
}) {
  const src = variant === "mark" ? "/brand/mark.svg" : "/brand/logo.svg";
  const alt = "Nepal Travel & Trek";
  const size =
    variant === "mark"
      ? { width: 40, height: 40 }
      : { width: 210, height: 48 };

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] rounded-lg ${className}`}
      aria-label="Go to homepage"
    >
      <img
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        loading="eager"
        decoding="async"
        style={{ height: "auto" }}
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );
}

