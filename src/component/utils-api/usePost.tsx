import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBudgetItemData, deleteBudgetItemData, updateBudgetItemData } from "./post.API";

// todo remove any
export const usePostMutation = (): Record<string, any> => {
  const queryClient = useQueryClient();
  const invalidateBudget = () => queryClient.invalidateQueries(["budget"]);
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

  return { useAddBudget, useDeletBudget, useUpdateBudget };
};
