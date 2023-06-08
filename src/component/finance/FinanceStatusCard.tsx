import { useState } from "react";
import { toggleSVG, YearlyTotals } from "../resume";
import { useGetBudgetDetails } from "../utils-api/get.API";
import { FinanceChart } from "./FinanceChart";

export const FinanceStatusCard: React.FC<any> = ({ barData }) => {
  const [toggle, setToggle] = useState(true);
  const { data: budgetDetails } = useGetBudgetDetails();
  let tempItemNames: string[] = [];
  let yearlyTotals: YearlyTotals = [];

  // Get item names
  budgetDetails?.forEach((data, index) => {
    budgetDetails[index].forEach((item) => tempItemNames.push(item.itemName));
  });
  // Remove duplicate names
  tempItemNames = tempItemNames.filter(
    (item, index) => tempItemNames.indexOf(item) === index
  );
  // Add amount to correct names
  tempItemNames.forEach((name) => {
    budgetDetails
      ?.map((data, index) => data.filter((item) => name === item.itemName))
      .forEach((data) => {
        let tempTotal = 0;
        if (data?.length > 0) {
          data.forEach((add) => {
            tempTotal = tempTotal + add.itemAmount;
          });

          const foundName = yearlyTotals.find((itemName) =>
            itemName?.name?.includes(data[0].itemName)
          );

          if (foundName === undefined) {
            yearlyTotals.push({ name: data[0].itemName, amount: tempTotal });
          } else {
            const dd = foundName?.amount as number;
            let tempYearlyTotals: YearlyTotals = [];
            if (foundName.name) {
              tempYearlyTotals.push({
                name: foundName.name,
                amount: data[0].itemAmount + dd,
              });

              yearlyTotals.forEach((add) => {
                if (foundName.name !== add.name)
                  tempYearlyTotals.push({
                    name: add.name,
                    amount: add.amount,
                  });
              });

              yearlyTotals = tempYearlyTotals;
            }
          }
        }
      });
  });
  // Push new items
  budgetDetails?.forEach((data, index) => {
    budgetDetails[index].forEach((item) => tempItemNames.push(item.itemName));
  });

  return (
    <>
      <div
        className="bg-white rounded-lg dark:bg-gray-800 basis-1/4"
        id="stats"
        role="tabpanel"
        aria-labelledby="stats-tab"
      >
        <dl className="grid  grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-9 dark:text-white">
          <button
            className="font-extrabold absolute h-14 w-14 -left-4 -top-4 text-white bg-resume-box focus:"
            onClick={() => setToggle(!toggle)}
          >
            {toggleSVG}
          </button>
          {toggle &&
            yearlyTotals.map((show) => (
              <>
                <div
                  key={show.name}
                  className="flex flex-col items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 m-1"
                >
                  <dt className="mb-2 text-3xl font-extrabold">
                    ${show.amount}
                  </dt>
                  <dd className="font-light pb-2 text-black text-base">
                    {show.name}
                  </dd>
                </div>
              </>
            ))}
        </dl>
      </div>
      {toggle && <FinanceChart barData={barData} />}
    </>
  );
};
