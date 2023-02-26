import React from "react";

export const CategoryHeader = (headerName: string) => {
  return (
    <div className="items-center uppercase tracking-wide text-sm text-teal-400 text-orange-600 font-semibold #d97706">
      {headerName}
    </div>
  );
};
