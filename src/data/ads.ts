export type Ad = { id: string; w: number; h: number; kind: "feed" | "story" | "display" | "email"; label: string };

export const ads: Ad[] = [
  { id: "feed-offer", w: 1080, h: 1350, kind: "feed", label: "Paid social · feed 4:5 · offer" },
  { id: "feed-hotel", w: 1080, h: 1350, kind: "feed", label: "Paid social · feed 4:5 · hotel spotlight" },
  { id: "story-offer", w: 1080, h: 1920, kind: "story", label: "Paid social · story / reel cover 9:16" },
  { id: "mpu", w: 300, h: 250, kind: "display", label: "Display · 300×250" },
  { id: "leader", w: 728, h: 90, kind: "display", label: "Display · 728×90" },
  { id: "sky", w: 160, h: 600, kind: "display", label: "Display · 160×600" },
  { id: "half", w: 300, h: 600, kind: "display", label: "Display · 300×600" },
  { id: "email-header", w: 600, h: 320, kind: "email", label: "Email · header 600×320" },
];
