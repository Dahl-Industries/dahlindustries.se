import type { ProjectDetails } from "../ProjectModal";

export enum ProjectsType {
  PROJECTS,
  LABS,
}

export type ProjectsProps = {
  maxCount?: number;
  projectsType?: ProjectsType;
};

export type ProjectProps = ProjectDetails & {
  title: string;
  titleTwo?: string;
  fullTitle: string;
  shortDescription: string;
  coverPhotoUrl: string;
};

