import Image from "next/image";
import Link from "next/link";

export default function SiteHeader({
  className,
  brandClassName,
  logoClassName,
  homeAriaLabel,
  logoAlt,
  rightContent = null,
}) {
  return (
    <header className={className}>
      <Link href="/" className={brandClassName} aria-label={homeAriaLabel}>
        <Image
          src="/fisheye-logo.svg"
          alt={logoAlt}
          width={200}
          height={50}
          className={logoClassName}
          priority
        />
      </Link>
      {rightContent}
    </header>
  );
}
