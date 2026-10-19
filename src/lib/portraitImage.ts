// Keep the original portraits available; serve pre-sized copies to avoid noisy downscaling.
export function portraitImage(source: string, sizes: string) {
  const filename = source.startsWith("/images/team/") && /\.(jpg|webp)$/.test(source)
    ? source.slice("/images/team/".length).replace(/\.(jpg|webp)$/, "")
    : source === "/images/raju.jpg" ? "raju-restored"
    : source === "/images/francis-mathew.jpeg" ? "francis-mathew" : null;

  if (!filename) return { src: source };

  const stem = filename.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const base = `/images/team/optimized/${stem}`;
  return {
    src: `${base}-960.webp`,
    srcSet: [160, 480, 960, 1440].map(width => `${base}-${width}.webp ${width}w`).join(", "),
    sizes,
  };
}
