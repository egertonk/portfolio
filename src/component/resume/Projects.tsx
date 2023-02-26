import React from "react";
import { useGetProjects } from "../utils-api/get.API";

export const Projects = () => {
  const { data: projects } = useGetProjects();

  return (
    <>
      {projects?.map((project) => (
        <>
          <li key={`${project.project_id}-projects`}>
            <a
              className="hover:underline"
              target={`${project.link_target}`}
              href={`${project.link}`}
            >
              <span className="font-bold">{project.name}</span>
            </a>
          </li>
        </>
      ))}
    </>
  );
};
