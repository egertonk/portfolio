import React, { useMemo, useState } from "react";
import { toggleSVG } from "../resume";
import { useGetBudgetDetails, useGetUser } from "../utils-api/get.API";
import { usePostMutation } from "../utils-api/usePost";

export const Finance = () => {
  // const { data: user } = useGetUser();
  const { data: budgetDetails } = useGetBudgetDetails();
  const { useAddBudget, useDeletBudget, useUpdateBudget } = usePostMutation();

  const [name, setName] = useState<string>("");
  const [addTable, setAddTable] = useState<string>();
  const [editName, setEditName] = useState<string>();
  const [editID, setEditID] = useState<number>();
  const [editList, setEditList] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [toggle, setToggleList] = useState<string[]>([]);

  const budgetWeekNames = useMemo(() => {
    let tempWeekNames: string[] = [];
    budgetDetails !== undefined &&
      budgetDetails?.forEach((data) => {
        data.forEach((item) => tempWeekNames.push(item.tableName));
      });
    return Array.from(new Set(tempWeekNames));
  }, [budgetDetails]);

  const handleDelete = (cellId: number, table: string) => {
    useDeletBudget.mutate({
      id: cellId,
      tableName: table,
    });
  };

  const handleSubmit = (tableName: string, cellId?: number) => {
    if (cellId === undefined && name && amount && tableName) {
      useAddBudget.mutate({
        itemName: name,
        itemAmount: amount,
        tableName: tableName,
      });
      resetNewForm();
    }
    if (cellId && name && amount && tableName) {
      useUpdateBudget.mutate({
        id: cellId,
        itemName: name,
        itemAmount: amount,
        tableName: tableName,
      });
      setEditName("");
      setEditID(0);
    }
  };

  const handleCancelItem = () => resetNewForm();

  const resetNewForm = () => {
    if (editID !== undefined && editID > 0) {
      setEditList(editList.filter((e) => e !== editID));
      setEditName("");
      setEditID(0);
    }
    setAddTable("");
    setName("");
    setAmount(0);
  };

  const editStatus = (
    budgetItemId: Number | undefined,
    budgetItemTableName: string | undefined
  ) => budgetItemId === editID && editName === budgetItemTableName;

  const handleAddItem = (tableName: string) => {
    if (name === "" && amount <= 0) setAddTable(tableName);
  };

  const handleToggle = (tableName: string) => {
    const foundTableStatus = toggle.find((table) => table === tableName);
    if (foundTableStatus) setToggleList(toggle.filter((e) => e !== tableName));
    else setToggleList((toggle) => [...toggle, tableName]);
  };

  const findTable = (tableName: string) =>
    toggle.find((table) => table === tableName) == undefined;

  const userInputs = (
    indexNumber: number,
    id: string,
    type: string,
    action?: string
  ) => (
    <input
      type={type}
      className="w-64 p-2 bg-white text-black text-left border border-slate-300 ... peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id={
        action === "add"
          ? `${
              budgetDetails !== undefined &&
              budgetDetails[indexNumber][0].tableName
            }-${id}`
          : `${
              budgetDetails !== undefined && budgetDetails[indexNumber][0].id
            }-${id}`
      }
      name={id}
      value={type === "text" ? name : amount}
      onChange={(e) =>
        type === "text"
          ? setName(e.currentTarget.value)
          : setAmount(parseFloat(e.currentTarget.value))
      }
    />
  );

  const buttons = (
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

  return (
    <>
      <h1 className="text-white text-2xl font-semibold md:text-3xl">
        Bi Weekly Family Budget
      </h1>

      <div className="flex flex-row flex flex-row container mx-auto px-6 py-3 grid grid-cols-2 gap-4">
        {budgetWeekNames.map((weekName, index) => (
          <div key={`${index}-table`}>
            <table
              key={`${index}-table`}
              className="flex-row table-fixed text-white border-separate border-spacing-2 "
            >
              <thead>
                <tr className="bg-resume-box text-center">
                  <th className="w-64 p-2 bg-resume-box text-center border border-slate-300 ...">
                    {weekName}
                  </th>
                  <th className="w-64 p-2 text-center border border-slate-300">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      disabled={addTable === weekName}
                      onClick={() => handleAddItem(weekName)}
                    >
                      Add Item
                    </button>
                  </th>
                  <th className="w-64 p-2 bg-resume-box text-center border border-slate-300 ...">
                    <button onClick={() => handleToggle(weekName)}>
                      {toggleSVG}
                    </button>
                  </th>
                </tr>
                {findTable(weekName) && (
                  <tr>
                    <th className="w-64 p-2 bg-resume-box text-center border border-slate-300 ...">
                      Name
                    </th>
                    <th className="w-32 p-2 bg-resume-box text-center border border-slate-300 ...">
                      Amount
                    </th>
                    <th className="w-32 p-2 bg-resume-box text-center border border-slate-300 ...">
                      Actions
                    </th>
                  </tr>
                )}
              </thead>
              {findTable(weekName) && (
                <>
                  <tbody>
                    {budgetDetails !== undefined &&
                      budgetDetails[index]?.map((budgetItem) => (
                        <tr key={`${budgetItem.id}-data`}>
                          <>
                            <td className="p-2 bg-white text-black text-left border border-slate-300 ...">
                              {editStatus(budgetItem.id, budgetItem.tableName)
                                ? userInputs(index, "name", "text")
                                : budgetItem.itemName}
                            </td>
                            <td className="p-2 bg-white text-black border border-slate-300 text-right ...">
                              {editStatus(
                                budgetItem.id,
                                budgetItem.tableName
                              ) ? (
                                userInputs(index, "amount", "number")
                              ) : (
                                <>${budgetItem.itemAmount}</>
                              )}
                            </td>
                            <td className="p-2 bg-white text-black border border-slate-300 ...">
                              {editStatus(
                                budgetItem.id,
                                budgetItem.tableName
                              ) && (
                                <>
                                  {buttons("Submit", () => {
                                    setEditList(
                                      editList.filter(
                                        (e) => e !== budgetItem.id
                                      )
                                    );
                                    handleSubmit(
                                      budgetItem.tableName,
                                      budgetItem.id
                                    );
                                  })}
                                  {buttons("Cancel", handleCancelItem)}
                                </>
                              )}{" "}
                              {editList.length === 0 && (
                                <>
                                  {buttons("Edit", () => {
                                    setEditList((editList) => [
                                      ...editList,
                                      budgetItem.id,
                                    ]);
                                    setEditName(budgetItem.tableName);
                                    setEditID(budgetItem.id);
                                    setName(budgetItem.itemName);
                                    setAmount(budgetItem.itemAmount);
                                  })}
                                  {buttons("Delete", () =>
                                    handleDelete(
                                      budgetItem.id,
                                      budgetItem.tableName
                                    )
                                  )}
                                </>
                              )}
                            </td>
                          </>
                        </tr>
                      ))}
                  </tbody>
                  <tr>
                    {budgetDetails !== undefined &&
                      addTable === budgetDetails[index][0].tableName && (
                        <>
                          <td className="p-2 bg-white text-black text-left border border-slate-300 ...">
                            {userInputs(index, "name", "text", "add")}
                          </td>
                          <td className="p-2 bg-white text-black border border-slate-300 ...">
                            {userInputs(index, "amount", "number", "add")}
                          </td>
                          <td className="bg-white text-black border border-slate-300 ...">
                            {buttons("Submit", () =>
                              handleSubmit(budgetDetails[index][0].tableName)
                            )}
                            {buttons("Cancel", handleCancelItem)}
                          </td>
                        </>
                      )}
                  </tr>
                </>
              )}
            </table>
          </div>
        ))}
      </div>
    </>
  );
};
