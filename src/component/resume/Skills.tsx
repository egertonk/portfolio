import React from "react";
import { CategoryHeader } from "./CategoryHeader";
import { useGetSkills } from "../utils-api/get.API";
import { listSkills } from "./HelperMethods";

export const Skills = () => {
  const { data: skills } = useGetSkills();
  return (
    <>
      {CategoryHeader("Skills")}
      {skills?.map((skill) => (
        <>
          <p className="block mt-1 leading-tight font-medium text-left font-bold">
            {skill.skillCategory}
          </p>
          <ul
            className="text-left list-disc ml-8"
            key={`skill-${skill.skill_id}`}
          >
            {listSkills(skill.listOfSkills)}
          </ul>
        </>
      ))}
    </>
  );
};
