import ArrowOutward from "@mui/icons-material/ArrowOutward";
import PlayCircleOutlineRounded from "@mui/icons-material/PlayCircleOutlineRounded";
import StarRounded from "@mui/icons-material/StarRounded";

const reviewProfileUrl = "https://www.reviewsolicitors.co.uk/london/london/law-and-lawyers-ltd?rating=1&source=GOOGLE#section-reviews";
const youtubeUrl = "https://youtube.com/@lawandlawyerssolicitors4237?si=E2FfJaC96Hkn0-QP";

const reviewMetrics = [
  { value: "93%", label: "Value for money" },
  { value: "94%", label: "Success rate" },
  { value: "93%", label: "Would recommend" },
];

const rankings = [
  ["Housing and Property", "1st / 30"],
  ["Commercial Property", "1st / 88"],
  ["Immigration", "1st / 34"],
  ["Family Law", "1st / 23"],
];

export default function TrustProof() {
  return (
    <section className="bg-[linear-gradient(120deg,#123568_0%,#2469b2_58%,#4a97d6_100%)] py-16 text-white sm:py-20">
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

        <div className="grid gap-4">
          <div className="rounded-2xl bg-white p-5 text-brand-950 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-5xl font-bold tracking-[-0.06em]">4.6</p>
                <div>
                  <p className="text-[15px] font-semibold">Excellent</p>
                  <div className="mt-1 flex items-center gap-0.5 text-star" aria-label="4.6 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((star) => <StarRounded key={star} sx={{ fontSize: 19 }} />)}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-brand-800">774 reviews</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {reviewMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl bg-brand-100/70 px-3 py-3">
                  <p className="text-xl font-bold text-brand-800">{metric.value}</p>
                  <p className="mt-1 text-[11px] font-medium leading-snug text-brand-800/70">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 sm:p-6">
            <p className="text-sm font-semibold text-white">Local rankings by area of expertise</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {rankings.map(([area, ranking]) => (
                <div key={area} className="flex items-center justify-between gap-4 border-b border-white/10 py-2 text-[13px]">
                  <span className="text-white/70">{area}</span>
                  <span className="font-semibold text-brand-200">{ranking}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/45">Review and ranking figures shown on the ReviewSolicitors profile supplied by Law and Lawyers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
