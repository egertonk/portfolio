import { useMemo, useState } from "react";
import { BudgetTypes, toggleSVG } from "../resume";
import { SiteHeader } from "../site-header/SiteHeader";
import {
  useGetActiveTables,
  useGetBudgetDetails,
  useGetUser,
} from "../utils-api/get.API";
import { usePostMutation } from "../utils-api/usePost";
import { FinanceStatusCard } from "./FinanceStatusCard";
import {
  buttonAction,
  findActiveTable,
  findToggleTable,
  getTable,
  getTableName,
  getTotal,
  getWeekNames,
  removeDuplicates,
} from "./FinanceHelpers";
import { FinanceTableTotals } from "./FinanceTableTotals";
import { FinanceAddTable } from "./FinanceAddTable";

export const Finance = () => {
  // const { data: user } = useGetUser();
  const { data: budgetDetails } = useGetBudgetDetails();
  const { data: activeTables } = useGetActiveTables();
  const {
    useAddBudget,
    useDeletBudget,
    useUpdateBudget,
    useAddTable,
    useDeletTable,
  } = usePostMutation();
  const [name, setName] = useState<string>("");
  const [addTable, setAddTable] = useState<string>();
  const [editName, setEditName] = useState<string>();
  const [addName, setAddName] = useState<string>();
  const [addAmount, setAddAmount] = useState<number>();
  const [editID, setEditID] = useState<number>();
  const [editList, setEditList] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [toggle, setToggleList] = useState<string[]>([]);

  const allBudetDetails = [] as BudgetTypes[];
  const barDetails = [] as {
    id: string;
    value: number;
  }[];

  const budgetWeekNames = useMemo(
    () => removeDuplicates(getWeekNames(activeTables)),
    [activeTables]
  );

  const budgetData = useMemo(() => {
    budgetDetails?.forEach((data) => {
      if (data.length !== 0) {
        allBudetDetails.push(data);
      } else {
        activeTables?.forEach((data) => {
          if (getTable(data.tableName, budgetDetails) === undefined) {
            allBudetDetails?.push([
              {
                id: 0,
                itemAmount: 0,
                itemName: "",
                tableName: data.tableName,
              },
            ]);
          }
        });
      }
    });

    return allBudetDetails;
  }, [activeTables, allBudetDetails, budgetDetails]);

  const barData = useMemo(() => {
    budgetData?.forEach((data) => {
      data.forEach((item) =>
        barDetails.push({ id: item.itemName, value: item.itemAmount })
      );
    });
    return barDetails;
  }, [budgetData]);

  const handleDelete = (table: string, cellId?: number) => {
    if (cellId === undefined) {
      const tableData = findActiveTable(table, activeTables);
      useDeletTable.mutate(tableData[0]);
    } else {
      useDeletBudget.mutate({
        id: cellId,
        tableName: table,
      });
    }
  };

  const handleSubmit = (tableName: string, cellId?: number) => {
    if (cellId === undefined) {
      useAddBudget.mutate({
        itemName: addName,
        itemAmount: addAmount,
        tableName: tableName,
      });
      setAddName("");
      setAddAmount(0);
      resetNewForm();
    }
    if (cellId) {
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
  ) => {
    return budgetItemId === editID && editName === budgetItemTableName;
  };

  const handleToggle = (tableName: string) => {
    const foundTableStatus = toggle.find((table) => table === tableName);
    if (foundTableStatus) setToggleList(toggle.filter((e) => e !== tableName));
    else setToggleList((toggle) => [...toggle, tableName]);
  };

  const addNewTable = (tableName: string) => {
    useAddTable.mutate({
      id: 0,
      tableName: tableName,
    });
  };

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
          ? `${budgetData[indexNumber][0]?.tableName}-${id}`
          : `${budgetData[indexNumber][0].id}-${id}`
      }
      name={id}
      value={
        type === "text"
          ? action === "add"
            ? addName
            : name
          : action === "add"
          ? addAmount
          : amount
      }
      onChange={(e) =>
        type === "text"
          ? action === "add"
            ? setAddName(e.currentTarget.value)
            : setName(e.currentTarget.value)
          : action === "add"
          ? setAddAmount(parseFloat(e.currentTarget.value))
          : setAmount(parseFloat(e.currentTarget.value))
      }
    />
  );

  return (
    <>
      <SiteHeader header={`${new Date().getFullYear()} Ultimate Budget`} />

      <FinanceStatusCard barData={barData} />

      <FinanceAddTable activeTables={activeTables} addNewTable={addNewTable} />

      <div className="flex flex-row flex flex-row container mx-auto px-6 py-3 grid grid-cols-2 gap-4">
        {budgetWeekNames?.map((weekName, index) => (
          <div key={`${index}-table`}>
            <div className="flex flex-row-reverse">
              {buttonAction("Delete Table", () => handleDelete(weekName))}
            </div>
            <table
              key={`${index}-table`}
              className="flex-row table-fixed text-white border-separate border-spacing-2 "
            >
              <thead>
                <tr className="bg-resume-box text-center">
                  <th className="w-64 p-2 bg-resume-box text-center border border-slate-300 ...">
                    {getTableName(weekName)}
                  </th>
                  <th className="w-64 p-2 text-center border border-slate-300">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      disabled={addTable === weekName}
                      onClick={() => setAddTable(weekName)}
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
                {findToggleTable(weekName, toggle) && (
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

              {findToggleTable(weekName, toggle) && (
                <>
                  <tbody>
                    {budgetData[index]?.map(
                      (budgetItem) =>
                        budgetItem.itemName !== "" &&
                        budgetItem.itemAmount !== 0 && (
                          <tr key={`${budgetItem.id}-data`}>
                            <>
                              <td className="pl-2 bg-white text-black text-left border border-slate-300 ...">
                                {editStatus(budgetItem.id, budgetItem.tableName)
                                  ? userInputs(index, "name", "text")
                                  : budgetItem.itemName}
                              </td>
                              <td className="pl-2 bg-white text-black border border-slate-300 text-right ...">
                                {editStatus(
                                  budgetItem.id,
                                  budgetItem.tableName
                                ) ? (
                                  userInputs(index, "amount", "number")
                                ) : (
                                  <>${budgetItem.itemAmount}</>
                                )}
                              </td>
                              <td className="pl-2 bg-white text-black border border-slate-300 ...">
                                {editStatus(
                                  budgetItem.id,
                                  budgetItem.tableName
                                ) && (
                                  <>
                                    {buttonAction("Submit", () => {
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
                                    {buttonAction("Cancel", handleCancelItem)}
                                  </>
                                )}{" "}
                                {editList.length === 0 && (
                                  <>
                                    {buttonAction("Edit", () => {
                                      setEditList((editList) => [
                                        ...editList,
                                        budgetItem.id,
                                      ]);
                                      setEditName(budgetItem.tableName);
                                      setEditID(budgetItem.id);
                                      setName(budgetItem.itemName);
                                      setAmount(budgetItem.itemAmount);
                                    })}
                                    {buttonAction("Delete", () =>
                                      handleDelete(
                                        budgetItem.tableName,
                                        budgetItem.id
                                      )
                                    )}
                                  </>
                                )}
                              </td>
                            </>
                          </tr>
                        )
                    )}

                    <FinanceTableTotals
                      total={getTotal(weekName, budgetDetails)}
                    />
                  </tbody>
                  <tr>
                    {addTable === budgetData[index][0]?.tableName && (
                      <>
                        <td className="pl-2 bg-white text-black text-left border border-slate-300 ...">
                          {userInputs(index, "name", "text", "add")}
                        </td>
                        <td className="pl-2 bg-white text-black border border-slate-300 ...">
                          {userInputs(index, "amount", "number", "add")}
                        </td>
                        <td className="bg-white text-black border border-slate-300 ...">
                          {buttonAction("Submit", () =>
                            handleSubmit(budgetData[index][0]?.tableName)
                          )}
                          {buttonAction("Cancel", handleCancelItem)}
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
