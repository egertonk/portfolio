import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JobTypes, ProjectsTypes, SkillTypes } from "../resume/Data-Types";
import { resumeAPI, url } from "./connection-data";
import { getWrapper } from "./fetch";

// user
export const getUser = (endpointName?: string): Promise<any> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetUser = () => {
  const queryClient = useQueryClient();
  return useQuery([`user`], () => getUser("users"));
};

// jobs
export const getJobs = (endpointName: string): Promise<JobTypes[]> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetJobs = () => {
  const queryClient = useQueryClient();
  return useQuery([`jobs`], () => getJobs("jobs"));
};

// skills
export const getSkills = (endpointName: string): Promise<SkillTypes[]> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetSkills = () => {
  const queryClient = useQueryClient();
  return useQuery([`skills`], () => getSkills("skills"));
};

// projects
export const getProjects = (endpointName: string): Promise<ProjectsTypes[]> => {
    return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
  };
  
  export const useGetProjects = () => {
    const queryClient = useQueryClient();
    return useQuery([`projects`], () => getProjects("projects"));
  };