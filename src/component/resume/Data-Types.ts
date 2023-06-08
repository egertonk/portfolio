export const menu = [
  "Resume",
  "API web Projects",
  "Finance",
  "Skills",
  "Tools",
  "Contact",
];

export type ProjectsTypes = {
  link: string;
  link_target: string;
  name: string;
  project_id: number;
};

export type JobTypes = {
  companyName: string;
  contractorName: string;
  duration: string;
  jobDescription: string[];
  jobTitle: string;
  job_id: number;
  location: string;
};

export type SkillTypes = {
  listOfSkills: string[];
  skillCategory: string;
  skill_id: number;
};

export type BudgetTypes = {
  id: number;
  itemName: string;
  itemAmount: number;
  tableName: string;
}[];

export type TableTypes = {
  id?: number;
  itemName?: string;
  itemAmount?: number;
  tableName?: string;
};

export type ActiveTablesTypes = {
  id?: number;
  tableName: string;
};

export type YearlyTotals = {
  name?: string;
  amount?: number;
}[];
