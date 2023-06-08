import { ActiveTablesTypes, BudgetTypes } from "../resume";

export const userTableName = {
  jan_budget_1_2: "January Week 1 and 2",
  jan_budget_3_4: "January Week 3 and 4",
  feb_budget_1_2: "February Week 1 and 2",
  feb_budget_3_4: "February Week 3 and 4",
  mar_budget_1_2: "March Week 1 and 2",
  mar_budget_3_4: "March Week 3 and 4",
  apr_budget_1_2: "April Week 1 and 2",
  apr_budget_3_4: "April Week 3 and 4",
  may_budget_1_2: "May Week 1 and 2",
  may_budget_3_4: "May Week 3 and 4",
  jun_budget_1_2: "June Week 1 and 2",
  jun_budget_3_4: "June Week 3 and 4",
  jul_budget_1_2: "July Week 1 and 2",
  jul_budget_3_4: "July Week 3 and 4",
  aug_budget_1_2: "August Week 1 and 2",
  aug_budget_3_4: "August Week 3 and 4",
  sep_budget_1_2: "September Week 1 and 2",
  sep_budget_3_4: "September Week 3 and 4",
  oct_budget_1_2: "October Week 1 and 2",
  oct_budget_3_4: "October Week 3 and 4",
  nov_budget_1_2: "November Week 1 and 2",
  nov_budget_3_4: "November Week 3 and 4",
  dec_budget_1_2: "December Week 1 and 2",
  dec_budget_3_4: "December Week 3 and 4",
};

export const buttonAction = (
  action: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
) => (
  <button
    type="button"
    className={
      action === "Submit" || action === "Edit"
        ? "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
        : "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    }
    onClick={onClick}
  >
    {action}
  </button>
);

export const getTableName = (name: string) => {
  const foundName = Object.keys(userTableName).find(
    (currentName) => currentName === name
  ) as string;
  return Object(userTableName)[`${foundName}`];
};

export const removeDuplicates = (table: string[]) => Array.from(new Set(table));

export const getWeekNames = (activeTables: ActiveTablesTypes[] | undefined) => {
  let tempWeekNames: string[] = [];
  activeTables?.forEach((data) => tempWeekNames.push(data.tableName));
  return tempWeekNames;
};

export const getTable = (
  tableName: string,
  budgetDetails: BudgetTypes[] | undefined
) =>
  budgetDetails?.filter(
    (data, index) =>
      budgetDetails[index][0]?.tableName?.toLocaleLowerCase() ===
      tableName?.toLocaleLowerCase()
  )[0] as BudgetTypes;

export const findToggleTable = (tableName: string, toggle: string[]) => {
  return toggle.find((table) => table === tableName) === undefined;
};

export const findActiveTable = (
  tableName: string,
  activeTables: ActiveTablesTypes[] | undefined
) => {
  return (
    activeTables !== undefined &&
    activeTables?.filter((data) => data.tableName === tableName)
  ) || [];
};

export const getTotal = (
  tableName: string,
  budgetDetails: BudgetTypes[] | undefined
) => {
  return (
    getTable(tableName, budgetDetails)?.reduce(
      (item, secondNumber) => (item = item + secondNumber.itemAmount),
      0
    ) || 0
  );
};
