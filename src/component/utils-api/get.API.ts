import { useQuery } from "@tanstack/react-query";
import {
  ActiveTablesTypes,
  BudgetTypes,
  JobTypes,
  ProjectsTypes,
  SkillTypes,
} from "../resume/Data-Types";
import { financeAPI, managerAPI, resumeAPI, url } from "./connection-data";
import { getWrapper } from "./fetch";

// user
export const getUser = (endpointName?: string): Promise<any> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetUser = () => {
  return useQuery([`user`], () => getUser("users"));
};

// jobs
export const getJobs = (endpointName: string): Promise<JobTypes[]> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetJobs = () => {
  return useQuery([`jobs`], () => getJobs("jobs"));
};

// skills
export const getSkills = (endpointName: string): Promise<SkillTypes[]> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetSkills = () => {
  return useQuery([`skills`], () => getSkills("skills"));
};

// projects
export const getProjects = (endpointName: string): Promise<ProjectsTypes[]> => {
  return getWrapper(`${url}/${resumeAPI}/${endpointName}`);
};

export const useGetProjects = () => {
  return useQuery([`projects`], () => getProjects("projects"));
};

// Finance
export const getBudgetDetails = (
  endpointName: string
): Promise<BudgetTypes[]> => {
  return getWrapper(`${url}/${financeAPI}/${endpointName}`);
};

export const useGetBudgetDetails = () => {
  return useQuery([`budget`], () => getBudgetDetails("budget"));
};

// Manager
export const getActiveTables = (
  endpointName: string
): Promise<ActiveTablesTypes[]> => {
  return getWrapper(`${url}/${managerAPI}/${endpointName}`);
};

export const useGetActiveTables = () => {
  return useQuery(
    [`active-tables-list`],
    () => getActiveTables("active-list") || []
  );
};
