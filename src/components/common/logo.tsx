import Link from "next/link";

interface NewsPortalLogoProps {
  href?: string;
  className?: string;
}

export default function NewsPortalLogo({
  href = "/",
  className = " flex justify-center",
}: NewsPortalLogoProps) {
  return (
    <Link
      href={href}
      aria-label="News Portal Home"
      className={`flex items-center justify-center ${className}`}
    >
      <span className="whitespace-nowrap text-lg font-bold tracking-tight text-white">
        News <span className="font-normal">Portal</span>
      </span>
    </Link>
  );
}
