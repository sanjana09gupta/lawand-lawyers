import { useEffect } from "react";

declare global {
  interface Window {
    rs?: { loadWidget: (elementId: string, widgetType: string, firmId: number, props: Record<string, unknown>) => void };
  }
}

type ReviewSolicitorsWidgetProps = {
  id: string;
  className?: string;
};

export default function ReviewSolicitorsWidget({ id, className = "" }: ReviewSolicitorsWidgetProps) {
  useEffect(() => {
    const target = document.getElementById(id);
    if (!target || target.dataset.reviewsolicitorsLoaded === "true") return;

    target.dataset.reviewsolicitorsLoaded = "true";

    const loadWidget = () => {
      if (target.isConnected && !target.querySelector("iframe")) {
        window.rs?.loadWidget(id, "3-column-carosel", 10832, {});
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-reviewsolicitors-widget="true"]');
    if (window.rs) {
      loadWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", loadWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://www.reviewsolicitors.co.uk/widget/rs.js";
      script.async = true;
      script.dataset.reviewsolicitorsWidget = "true";
      script.addEventListener("load", loadWidget, { once: true });
      document.body.appendChild(script);
    }
  }, [id]);

  return <div id={id} className={className} style={{ position: "relative" }} />;
}
