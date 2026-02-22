import { useMemo, FC } from "react";

import Project from "./Project";
import { PROJECTS, LABS } from "./Projects.data";
import { ProjectsProps, ProjectsType } from "./Projects.types";

const PROJECTS_LIST = {
  [ProjectsType.PROJECTS]: PROJECTS,
  [ProjectsType.LABS]: LABS,
};

const Projects: FC<ProjectsProps> = ({
  maxCount,
  projectsType = ProjectsType.PROJECTS,
}) => {
  const projectsList = useMemo(() => {
    return maxCount
      ? PROJECTS_LIST[projectsType].slice(0, maxCount)
      : PROJECTS_LIST[projectsType];
  }, [projectsType, maxCount]);

  return (
    <>
      {projectsList.map((project) => (
        <Project key={project.name} {...project} />
      ))}
    </>
  );
};

export default Projects;

