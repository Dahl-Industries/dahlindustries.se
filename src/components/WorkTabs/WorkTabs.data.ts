import { ProjectsType, TOTAL_PROJECTS } from "../Projects";
import { toTwoDigits } from "../../utils";
import type { WorkTab } from "./WorkTabs.types";

export const WORK_TABS: WorkTab[] = [
  {
    title: "Projects",
    description:
      "A selected set of projects I've built with individuals and teams. This is a mix of personal, collaborative and client owned projects.",
    projectsType: ProjectsType.PROJECTS,
    total: toTwoDigits(TOTAL_PROJECTS),
  },
];

export const HERO_NUMBER_ANIMATION_DELAY = 0.95;
export const HERO_TEXT_ANIMATION_DELAY = 0.46;
export const TAB_DESCRIPTIONANIMATION_DELAY = 1;
