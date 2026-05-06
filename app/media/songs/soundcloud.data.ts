export type Song = {
  title: string;
  url: string;
  releasedAt: string; // ISO format recommended
  description: string;
};

export const songs: Song[] = [
  {
    title: "What is Even Happening",
    url: "https://soundcloud.com/sadraw/what-is-even-happening",
    releasedAt: "2026-05-01",
    description: "A drifting reflection of noise and thought.",
  },
  {
    title: "Deltang",
    url: "https://soundcloud.com/sadraw/deltang",
    releasedAt: "2026-04-28",
    description: "Experimental ambient texture piece.",
  },
  {
    title: "Why Do Trees Sway",
    url: "https://soundcloud.com/sadraw/why-do-trees-sway",
    releasedAt: "2026-04-20",
    description: "Soft movement translated into sound.",
  },
  {
    title: "Just Us Talking",
    url: "https://soundcloud.com/sadraw/just-us-talking",
    releasedAt: "2026-04-10",
    description: "A fragmented conversation in audio form.",
  },
  {
    title: "As You Pass Through My Mind",
    url: "https://soundcloud.com/sadraw/as-you-pass-through-my-mind",
    releasedAt: "2026-04-02",
    description: "Memory passing like static.",
  },
  {
    title: "Falling Into The Abyss",
    url: "https://soundcloud.com/sadraw/falling-into-the-abyss",
    releasedAt: "2026-03-25",
    description: "Descending layers of sound design.",
  },
  {
    title: "Khoon",
    url: "https://soundcloud.com/sadraw/khoon",
    releasedAt: "2026-03-10",
    description: "Raw emotional soundscape.",
  },
  {
    title: "Safe and Sound (Cover)",
    url: "https://soundcloud.com/sadraw/safe-and-sound-cover",
    releasedAt: "2026-02-02",
    description: "Cover reinterpretation",
  },
];