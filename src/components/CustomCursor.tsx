import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cursor.current;
    if (!element) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    let ready = false;
    let disposed = false;
    let x = 0;
    let y = 0;
    let tracking = false;
    const hide = () => {
      tracking = false;
      root.classList.remove("custom-cursor-active");
      element.hidden = true;
    };
    // Keep the native cursor until both user-provided images are available.
    Promise.all(["cursor", "click"].map(name => new Promise<void>((resolve, reject) => {
      const asset = new Image();
      asset.onload = () => resolve();
      asset.onerror = reject;
      asset.src = `/cursors/${name}.png`;
    }))).then(() => { if (!disposed) ready = true; }).catch(hide);

    const update = () => {
      const target = document.elementFromPoint(x, y);
      if (!ready || !media.matches || !target || target.closest("input, textarea, select, [contenteditable], iframe, video, :disabled, [aria-disabled='true']")) {
        hide();
        return;
      }
      const clickable = Boolean(target.closest("a[href], button, [role='button'], [role='radio'], label, summary")) || getComputedStyle(target).cursor === "pointer";
      element.dataset.kind = clickable ? "click" : "default";
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.hidden = false;
      root.classList.add("custom-cursor-active");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { hide(); return; }
      x = event.clientX;
      y = event.clientY;
      tracking = true;
      update();
    };
    const scroll = () => { if (tracking) update(); };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    media.addEventListener("change", hide);
    return () => {
      disposed = true;
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("scroll", scroll, true);
      media.removeEventListener("change", hide);
    };
  }, []);

  return <div ref={cursor} className="custom-cursor" hidden aria-hidden="true">
    <img className="cursor-default" src="/cursors/cursor.png" alt="" />
    <img className="cursor-click" src="/cursors/click.png" alt="" />
  </div>;
}
