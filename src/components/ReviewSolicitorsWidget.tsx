type ReviewSolicitorsWidgetProps = {
  id: string;
  className?: string;
};

export default function ReviewSolicitorsWidget({ id, className = "" }: ReviewSolicitorsWidgetProps) {
  return (
    <div id={id} className={className} style={{ position: "relative" }}>
      <iframe
        title="Law and Lawyers client reviews on ReviewSolicitors"
        src="https://www.reviewsolicitors.co.uk/widget/3-column-carosel/10832/?"
        loading="lazy"
        scrolling="no"
        className="block w-full border-0"
      />
    </div>
  );
}
