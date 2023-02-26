import React from "react";
import { CategoryHeader } from ".";

export const Education = () => {
  console.log("Education");

  return (
    <>
      {CategoryHeader("Education")}
      <div className="flex">
        <div className="flex-col">
          <div className="text-left block mt-1 leading-tight font-medium font-bold">
            Bachelor of Science Degree
          </div>
          <ul className="text-left text-base list-disc ml-8">
            <li>
              <span className="font-bold">School: </span>George Mason University
            </li>
            <li>
              <span className="font-bold">B.S: </span>Applied Information
              Technology
            </li>
            <li>
              <span className="font-bold">Major: </span>Web Programming and
              Database Development
            </li>
            <li>
              <span className="font-bold">Graduated: </span>May 2019 | Fairfax,
              VA
            </li>
          </ul>
        </div>
        <div className="flex-col">
          <div className="text-left block mt-1 text-lg leading-tight font-medium font-bold">
            Associate of Science Degree
          </div>
          <ul className="text-left list-disc ml-8">
            <li>
              <span className="font-bold">School: </span>Northern Virginia
              Community College
            </li>
            <li>
              <span className="font-bold">A.S: </span>Information Technology
            </li>
            <li>
              <span className="font-bold">Graduated: </span>December 2013 |
              Woodbridge, VA
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
