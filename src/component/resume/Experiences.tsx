import React from "react";
import { CategoryHeader, checkMarkSVG } from ".";
import { useGetJobs } from "../utils-api/get.API";

export const Experiences = () => {
  const { data: jobs } = useGetJobs();

  return (
    <>
      {CategoryHeader("PROFESSIONAL EXPERIENCE")}
      {jobs?.map((detail) => (
        <>
          {CategoryHeader(detail.contractorName)}
          <div className="text-left font-bold">
            <p>{detail.jobTitle}</p>
            <p>{detail.companyName}</p>
            <p>{detail.location}</p>
            <p>{detail.duration}</p>
          </div>
          <ul
            className="list-inside md:list-inside text-base text-slate-500"
            key={`${detail.job_id}-job`}
          >
            {detail.jobDescription.map((description, index) => (
              <li className="flex ml-8 text-left" key={`${index}-Description`}>
                {checkMarkSVG}
                <span className="ml-1">{description}.</span>
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
};
