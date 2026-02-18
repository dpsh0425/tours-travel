import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-[var(--brand-2)] text-white hover:translate-y-[-1px] hover:shadow-[var(--shadow-soft)] active:translate-y-[0px] active:shadow-none",
    secondary:
      "bg-white text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-2)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-soft)] active:translate-y-[0px] active:shadow-none",
    danger:
      "bg-red-600 text-white hover:bg-red-700 hover:translate-y-[-1px] hover:shadow-[var(--shadow-soft)] active:translate-y-[0px] active:shadow-none",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
