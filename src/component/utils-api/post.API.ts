import { TableTypes } from "../resume";
import {
  addBudgetItem,
  addTableItem,
  deleteBudgetItem,
  deleteUserTable,
  financeAPI,
  managerAPI,
  updateBudgetItem,
  url,
} from "./connection-data";
import { fetchWrapper, deletWrapperWithID } from "./fetch";

// Finance
export const addBudgetItemData = (body: TableTypes) => {
  return fetchWrapper(`${url}/${financeAPI}/${addBudgetItem}`, body, "POSt");
};

export const deleteBudgetItemData = (body: TableTypes) => {
  return deletWrapperWithID(
    `${url}/${financeAPI}/${deleteBudgetItem}/${body.tableName}_id_${body.id}`
  );
};

export const updateBudgetItemData = (body: TableTypes) => {
  return fetchWrapper(`${url}/${financeAPI}/${updateBudgetItem}`, body, "Put");
};

// Manager
export const addTable = (body: TableTypes) => {
  return fetchWrapper(`${url}/${managerAPI}/${addTableItem}`, body, "POSt");
};

export const deleteTable = (body: TableTypes) => {
  return deletWrapperWithID(
    `${url}/${managerAPI}/${deleteUserTable}/${body.id}`
  );
};