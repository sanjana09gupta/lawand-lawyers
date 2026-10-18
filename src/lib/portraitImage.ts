// Keep the original portraits available; serve pre-sized copies to avoid noisy downscaling.
export function portraitImage(source: string, sizes: string) {
  const filename = source.startsWith("/images/team/") && source.endsWith(".jpg")
    ? source.slice("/images/team/".length, -4)
    : source === "/images/raju.jpg" ? "raju-restored" : null;

  if (!filename) return { src: source };

  const stem = filename.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const base = `/images/team/optimized/${stem}`;
  return {
    src: `${base}-960.webp`,
    srcSet: [160, 480, 960, 1440].map(width => `${base}-${width}.webp ${width}w`).join(", "),
    sizes,
  };
}
