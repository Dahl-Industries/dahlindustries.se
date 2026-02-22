import type { ProjectProps } from "./Projects.types";

/** SCREENSHOT CAPTURE
 * Render page with chrome responsive dimensions in inspector (1782 x 999).
 * Run capture screenshot command in console. (cmd + p, >). It exports in 2x
 */

export const PROJECTS: ProjectProps[] = [
  {
    name: "Soundbank",
    title: "Sound",
    titleTwo: "bank",
    fullTitle: "Soundbank",
    shortDescription:
      "Soundbank™ delivers fully licensed audio for public spaces, custom-tailored to enhance the brand experience.",
    description:
      "A configuration layer that tailors music mood, scheduling and playback behavior to each venue type and brand identity.",
    client: "Dahl Industries",
    clientLink: "https://dahlindustries.se",
    role: "UX engineering",
    year: "2025",
    coverPhotoUrl: "/images/IMG_5147.jpg",
    link: "https://www.soundbank.se",
    modalBg: "#535E5A",
    mediaUrls: [
      "/images/Audio-Curator-Feb-21-23-44-28.mp4",
    ],
  },
];

export const LABS: ProjectProps[] = [
  {
    name: "Restaurant Mode",
    title: "Restau",
    titleTwo: "rants",
    fullTitle: "Restaurant Mode",
    shortDescription: "Adaptive playback mode tuned for restaurant dayparts",
    description:
      "Experimenting with tempo and energy transitions to align music with lunch, dinner and late service without manual intervention.",
    role: "Music system design",
    year: "2026",
    coverPhotoUrl: "/images/pension-app-cover.jpg",
    link: "https://dahlindustries.se/work",
    modalBg: "#564d4d",
    mediaUrls: [
      "/images/pension-app-01.jpg",
      "/images/pension-app-02.jpg",
      "/images/pension-app-03.jpg",
    ],
  },
  {
    name: "Gym Mode",
    title: "Gym",
    titleTwo: "Mode",
    fullTitle: "Gym Mode",
    shortDescription:
      "High-energy sequencing model for training focused environments",
    description:
      "A prototype that curates and rotates high tempo tracks for workouts while respecting brand-safe and royalty-free requirements.",
    role: "R&D",
    year: "2025",
    coverPhotoUrl: "/images/controller-cover.jpg",
    link: "https://dahlindustries.se/work",
    modalBg: "#535E5A",
    mediaUrls: ["/images/controller-01.jpg", "/images/controller-02.jpg"],
  },
  {
    name: "Hotel Lounge",
    title: "Hotel",
    titleTwo: "Lounge",
    fullTitle: "Hotel Lounge",
    shortDescription:
      "Low intensity evening sound profiles for hospitality spaces",
    description:
      "A concept for smooth, low-distraction music flows designed for hotel lobbies, lounges and reception areas.",
    role: "R&D",
    year: "2025",
    coverPhotoUrl: "/images/dashboard-cover.jpg",
    link: "https://dahlindustries.se/work",
    modalBg: "#535E5A",
    mediaUrls: ["/images/dashboard-01.jpg", "/images/dashboard-02.jpg"],
  },
];

export const TOTAL_PROJECTS = PROJECTS.length;
export const TOTAL_LABS = LABS.length;
export const MODAL_EXIT_DURATION = 680;
