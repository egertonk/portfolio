import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { findActiveTable, userTableName } from "./FinanceHelpers";

export const FinanceAddTable: React.FC<any> = ({
  activeTables,
  addNewTable,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div key="add-button">
        <Menu.Button className="font-extrabold text-white bg-resume-box rounded-lg text-sm px-4 py-2.5 h-10 font-semibold font-base text-center inline-flex items-center">
          Select to Add another Table
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-full absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {Object.entries(userTableName).map(
            (item) =>
              findActiveTable(item[0], activeTables).length > 0 === false && (
                <div className="py-1" key={item[1]}>
                  <Menu.Item>
                    <button
                      type="button"
                      className="w-full dark:bg-blue-900 dark:text-blue-300 bg-blue-100 block px-4 py-2 text-1xl font-bold"
                      onClick={() => addNewTable(item[0])}
                    >
                      {item[1]}
                    </button>
                  </Menu.Item>
                </div>
              )
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
