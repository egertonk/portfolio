import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addBudgetItemData,
  addTable,
  deleteBudgetItemData,
  deleteTable,
  updateBudgetItemData,
} from "./post.API";

// todo remove any
export const usePostMutation = (): Record<string, any> => {
  const queryClient = useQueryClient();
  const invalidateBudget = () => queryClient.invalidateQueries(["budget"]);
  const invalidateAddTable = () =>
    queryClient.invalidateQueries(["active-tables-list"]);

  // Finance
  const useAddBudget = useMutation(addBudgetItemData, {
    onSuccess: (res) => {
      invalidateBudget();
    },
  });

  const useDeletBudget = useMutation(deleteBudgetItemData, {
    onSuccess: (res) => {
      invalidateBudget();
    },
  });

  const useUpdateBudget = useMutation(updateBudgetItemData, {
    onSuccess: (res) => {
      invalidateBudget();
    },
  });

  // Manager
  const useAddTable = useMutation(addTable, {
    onSuccess: (res) => {
      invalidateAddTable();
      invalidateBudget();
    },
  });

  const useDeletTable = useMutation(deleteTable, {
    onSuccess: (res) => {
      invalidateAddTable();
      invalidateBudget();
    },
  });
  return {
    useAddBudget,
    useDeletBudget,
    useUpdateBudget,
    useAddTable,
    useDeletTable,
  };
};
