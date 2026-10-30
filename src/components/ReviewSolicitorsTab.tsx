const reviewProfileUrl = "https://www.reviewsolicitors.co.uk/london/london/law-and-lawyers-ltd?rating=1&source=GOOGLE#section-reviews";

export default function ReviewSolicitorsTab() {
  return (
    <a
      className="review-solicitors-tab"
      href={reviewProfileUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Read Law and Lawyers client reviews on ReviewSolicitors"
    >
      <span>reviewsolicitors</span>
    </a>
  );
}
