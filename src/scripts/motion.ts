import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !location.search.includes("motion"); // ?motion forces motion for testing
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Split headings into words (keeps text readable to screen readers via aria-label).
function split(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim().replace(/\s+/g, " "));
  const html = el.innerHTML;
  // keep <em> by splitting text nodes only
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    n.data.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.append(" "); return; }
      const w = document.createElement("span");
      w.className = "w"; w.setAttribute("aria-hidden", "true");
      const i = document.createElement("span");
      i.textContent = part; w.append(i); frag.append(w);
    });
    n.replaceWith(frag);
  }
  return html;
}

if (!reduce) {
  document.documentElement.classList.add("js-motion");

  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    split(el);
    el.classList.add("is-split");
    const inner = el.querySelectorAll(".w > span");
    const onLoad = el.hasAttribute("data-now");
    gsap.fromTo(inner, { yPercent: 110 }, {
      yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.06,
      delay: onLoad ? 0.15 : 0,
      ...(onLoad ? {} : { scrollTrigger: { trigger: el, start: "top 88%" } }),
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: el.hasAttribute("data-now") ? 0.5 : 0,
      ...(el.hasAttribute("data-now") ? {} : { scrollTrigger: { trigger: el, start: "top 90%" } }) });
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
    tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut" });
    if (img) tl.from(img, { scale: 1.25, duration: 1.6, ease: "expo.out" }, 0.2);
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const amt = Number(el.dataset.parallax || 12);
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // Marquee
  document.querySelectorAll<HTMLElement>("[data-marquee]").forEach((el) => {
    const track = el.firstElementChild as HTMLElement;
    track.append(...Array.from(track.children).map((c) => c.cloneNode(true)));
    const tween = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    ScrollTrigger.create({ onUpdate: (s) => gsap.to(tween, { timeScale: s.direction * (1 + Math.min(Math.abs(s.getVelocity()) / 400, 4)), duration: 0.4, overwrite: true }) });
  });
}

// Header state
const header = document.querySelector<HTMLElement>(".site-header");
if (header) {
  const set = () => header.classList.toggle("is-solid", window.scrollY > 40);
  set(); window.addEventListener("scroll", set, { passive: true });
}

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Cursor + magnetic buttons (fine pointers only)
if (finePointer && !reduce) {
  const cur = document.createElement("div");
  cur.className = "cursor"; cur.innerHTML = "<span></span>";
  document.body.append(cur);
  const label = cur.querySelector("span")!;
  const xTo = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
  window.addEventListener("pointermove", (e) => { cur.style.opacity = "1"; xTo(e.clientX); yTo(e.clientY); });
  document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => { label.textContent = el.dataset.cursor || "View"; cur.classList.add("is-big"); });
    el.addEventListener("pointerleave", () => cur.classList.remove("is-big"));
  });

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3); y((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener("pointerleave", () => { x(0); y(0); });
  });

  // Card tilt-free hover: image follows pointer slightly
  document.querySelectorAll<HTMLElement>("[data-drift]").forEach((card) => {
    const img = card.querySelector("img");
    if (!img) return;
    const x = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3" });
    const y = gsap.quickTo(img, "y", { duration: 0.8, ease: "power3" });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      x(((e.clientX - r.left) / r.width - 0.5) * -14); y(((e.clientY - r.top) / r.height - 0.5) * -14);
    });
    card.addEventListener("pointerleave", () => { x(0); y(0); });
  });
}

// Filters on listing pages
const grid = document.querySelector<HTMLElement>("[data-filter-grid]");
if (grid) {
  const chips = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
  const count = document.querySelector("[data-count]");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    const f = chip.dataset.filter!;
    let n = 0;
    grid.querySelectorAll<HTMLElement>("[data-tags]").forEach((card) => {
      const show = f === "all" || card.dataset.tags!.split("|").includes(f);
      card.hidden = !show; if (show) n++;
    });
    if (count) count.textContent = `${n} ${n === 1 ? "hotel" : "hotels"}`;
    ScrollTrigger.refresh();
  }));
}
