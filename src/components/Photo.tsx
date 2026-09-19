import Image from "next/image";

// Shows the real photo when `src` is set. Until then, a labeled placeholder marks what the photo should be.
export function Photo({ src, alt, caption, className = "", tone = "dark", priority = false, sizes = "100vw" }: {
  src?: string; alt: string; caption: string; className?: string; tone?: "dark" | "light"; priority?: boolean; sizes?: string;
}) {
  if (src) {
    return (
      <div className={`photo ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div className={`photo photo--placeholder photo--${tone} ${className}`} role="img" aria-label={alt}>
      <span className="photo__caption">Photo: {caption}</span>
    </div>
  );
}
