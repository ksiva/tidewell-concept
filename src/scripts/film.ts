// "The way in": a scroll film. The section is tall and its stage is sticky; scroll progress picks the frame.
// Frames (WebP, a 9:16 cut for phones) load coarse to fine, so a fast scroller always has a neighbour on screen.
// Pattern from the Highlighter reference (patterns/frames.js + pin.js).
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The film moves only when you scroll, so it plays even with system animations off (it is your own scroll).
const reduce = false;

function order(n: number) {
  const seen = new Set<number>(), out: number[] = [];
  const push = (i: number) => { if (i >= 0 && i < n && !seen.has(i)) { seen.add(i); out.push(i); } };
  push(0); push(n - 1);
  for (let s = 32; s >= 1; s /= 2) for (let i = 0; i < n; i += s) push(i);
  return out;
}

document.querySelectorAll<HTMLElement>("[data-film]").forEach((root) => {
  const canvas = root.querySelector("canvas")!;
  const n = Number(root.dataset.count);
  const phone = matchMedia("(max-aspect-ratio: 4/5)").matches;
  const dir = `${root.dataset.base}/${phone ? "m" : "d"}`;
  const imgs: (HTMLImageElement | null)[] = new Array(n).fill(null);
  const beats = [...root.querySelectorAll<HTMLElement>("[data-at]")].map((el) => ({ el, at: el.dataset.at!.split(",").map(Number) }));
  const dots = root.querySelectorAll<HTMLElement>(".wayin__stops li");
  const line = root.querySelector<HTMLElement>(".wayin__line i");
  let p = reduce ? 0.98 : 0;

  const nearest = (i: number) => { for (let d = 0; d < n; d++) { if (imgs[i - d]) return imgs[i - d]; if (imgs[i + d]) return imgs[i + d]; } return null; };
  const paint = () => {
    const img = nearest(Math.round(p * (n - 1)));
    if (!img) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
  };
  const ui = () => {
    for (const { el, at: [a, b] } of beats) el.classList.toggle("is-on", p >= a && p < b);
    if (line) line.style.transform = `scaleX(${p})`;
    dots.forEach((d) => d.classList.toggle("is-on", p >= Number(d.dataset.at)));
  };

  const load = () => {
    const q = order(n);
    const worker = async () => {
      while (q.length) {
        const i = q.shift()!;
        const im = new Image(); im.decoding = "async";
        im.src = `${dir}/f${String(i + 1).padStart(3, "0")}.webp`;
        try { await im.decode(); imgs[i] = im; if (Math.abs(i - p * (n - 1)) < 6 || i === 0) paint(); } catch { /* neighbour fills in */ }
      }
    };
    for (let k = 0; k < 6; k++) worker();
  };
  // start loading a screen and a half before the section arrives
  const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: "150% 0px" });
  io.observe(root);
  addEventListener("resize", paint);
  ui();
  if (reduce) return;
  ScrollTrigger.create({
    trigger: root, start: "top top", end: "bottom bottom", scrub: true,
    onUpdate: (self) => { p = self.progress; paint(); ui(); },
  });
});
