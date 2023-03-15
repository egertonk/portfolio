import { SingleBudgetTypes, DeleteBudgetTypes } from "../resume";
import {
  addBudgetItem,
  deleteBudgetItem,
  financeAPI,
  updateBudgetItem,
  url,
} from "./connection-data";
import { postWrapper, deletWrapperWithID, putWrapper } from "./fetch";

// Finance
export const addBudgetItemData = (body: SingleBudgetTypes) => {
  return postWrapper(`${url}/${financeAPI}/${addBudgetItem}`, body);
};

export const deleteBudgetItemData = (body: DeleteBudgetTypes) => {
  return deletWrapperWithID(
    `${url}/${financeAPI}/${deleteBudgetItem}/${body.tableName}_id_${body.id}`
  );
};

export const updateBudgetItemData = (body: SingleBudgetTypes) => {
  return putWrapper(`${url}/${financeAPI}/${updateBudgetItem}`, body);
};
