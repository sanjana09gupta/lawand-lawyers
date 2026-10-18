import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteName = "Law and Lawyers Solicitors";
const siteUrl = "https://lawandlawyers.co.uk";

const pages: Record<string, { title: string; description: string }> = {
  "/": { title: "Solicitors in London & Manchester", description: "Law and Lawyers Solicitors provide clear, practical legal advice across property, immigration, wills and probate, employment, family law and dispute resolution." },
  "/services": { title: "Legal services", description: "Explore legal services for individuals and businesses from Law and Lawyers Solicitors." },
  "/about": { title: "About our firm", description: "Learn about Law and Lawyers Solicitors, our client-first approach and our experienced legal team." },
  "/our-people": { title: "Our people", description: "Meet the solicitors and legal professionals at Law and Lawyers." },
  "/news": { title: "Legal news and insights", description: "Practical legal guides and updates from Law and Lawyers Solicitors." },
  "/contact": { title: "Contact us", description: "Contact Law and Lawyers Solicitors in London and Manchester to discuss your legal matter." },
  "/careers": { title: "Careers", description: "Explore career opportunities with Law and Lawyers Solicitors." },
  "/book-a-consultation": { title: "Book a consultation", description: "Book a consultation with Law and Lawyers Solicitors." },
};

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (property) tag.setAttribute("property", name); else tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/** Keeps title, description, canonical URL and sharing metadata aligned with the active route. */
export default function Seo() {
  const { pathname } = useLocation();
  const page = pages[pathname] ?? {
    title: pathname.startsWith("/services/") ? "Legal service" : pathname.startsWith("/team/") ? "Our legal team" : "Legal advice",
    description: "Clear, practical legal advice from Law and Lawyers Solicitors.",
  };

  useEffect(() => {
    const title = `${page.title} | ${siteName}`;
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
    document.title = title;
    setMeta("description", page.description);
    setMeta("og:title", title, true);
    setMeta("og:description", page.description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
  }, [page.description, page.title, pathname]);

  return null;
}
