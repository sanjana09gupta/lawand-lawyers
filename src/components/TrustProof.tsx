import { useEffect } from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import PlayCircleOutlineRounded from "@mui/icons-material/PlayCircleOutlineRounded";

const reviewProfileUrl = "https://www.reviewsolicitors.co.uk/london/london/law-and-lawyers-ltd?rating=1&source=GOOGLE#section-reviews";
const youtubeUrl = "https://youtube.com/@lawandlawyerssolicitors4237?si=E2FfJaC96Hkn0-QP";

export default function TrustProof() {
  useEffect(() => {
    const script = document.querySelector<HTMLScriptElement>('script[src="https://www.reviewsolicitors.co.uk/widget/rs.js"]');
    const load = () => {
      const target = document.getElementById("rswidget_490ac");
      const rs = (window as Window & { rs?: { loadWidget: (id: string, type: string, firm: number, props: object) => void } }).rs;
      if (target && !target.querySelector("iframe")) rs?.loadWidget("rswidget_490ac", "dropdown", 10832, {});
    };
    load();
    script?.addEventListener("load", load);
    return () => script?.removeEventListener("load", load);
  }, []);

  return (
    <section className="home-contrast-section home-proof-section py-16 text-white sm:py-20">
      <div className="container-px grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-300">Independent feedback</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-[1.08] text-white sm:text-4xl">Trusted by clients. Recognised across key practice areas.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
            Our ReviewSolicitors profile highlights the experience clients have had with our team, alongside local rankings across the services we provide.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={reviewProfileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-brand-950 transition-colors hover:bg-brand-200">
              Read verified reviews <ArrowOutward fontSize="small" />
            </a>
            <a href={youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-[13px] font-semibold text-white transition-colors hover:border-brand-300 hover:text-brand-300">
              <PlayCircleOutlineRounded fontSize="small" /> Watch on YouTube
            </a>
          </div>
        </div>
        <div id="rswidget_490ac" style={{ position: "relative" }} />
      </div>
    </section>
  );
}
