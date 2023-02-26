import React from "react";
import { Education, Experiences, NavMenu, Projects, Skills } from ".";
import profileImage from "../../support-files/images/EgertonDuring.jpg";
import backgroundImage from "../../support-files/images/Things-to-do-in-Chicago-Millennium-Park.jpg";
import { resumeAPI, url } from "../utils-api/connection-data";
import { useGetUser } from "../utils-api/get.API";
import { CategoryHeader } from "./CategoryHeader";

export const Resume = () => {
  const { data: user } = useGetUser();
  console.log("user = ", user);
  const data = {
    firstName: "Jessa",
    lastName: "Wife",
    email: "jessaduring",
  };
  // useEffect(() => {
  //   console.log("sent to databse");
  //   fetch(`${url}/${resumeAPI}/addusers`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   // const requestOptions = {
  //   //   method: "POST",
  //   //   credentials: "Include",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify(data),
  //   //   mode: "cors",
  //   // };
  //   // // const response = fetch("http://localhost:8080/api/addusers/", requestOptions);
  //   // const response = fetch(
  //   //   `http://localhost:8080/api/addusers/${requestOptions}`
  //   // );
  // }, [user]);
  return (
    <>
      <div className="grid place-items-center w-50 bg-cover">
        <h1 className="text-white text-2xl font-semibold md:text-3xl">
          Leave a Better World
        </h1>

        <div className="flex flex-col items-center text-white justify-center p-2 text-center md:rounded-br-lg w-full ">
          <a
            href="#"
            className="h-45 flex flex-col items-center bg-resume-box border rounded-lg shadow-md w-full md:flex-row md:max-w-xl hover:bg-gray-100 hover:text-black"
          >
            <img
              className="object-cover w-full h-48 rounded-full h-96 md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
              src={profileImage}
              alt="profile Image"
              style={{ objectFit: "contain" }}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="uppercase tracking-wide text-sm text-teal-400 font-semibold">
                Summary
              </div>
              <p className="text-left mt-2 text-slate-500">
                Innovative Junior Full Stack Developer with extensive work
                experience in coding development, design, and maintenance.
                Seeking to use my knowledge and background in development for
                front-end, back-end or both on any application.
              </p>
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="justify-between p-4 leading-normal  bg-resume-box text-white border h-45 rounded-lg shadow-md w-full md:flex-row md:max-w-xl hover:bg-gray-100 hover:text-black">
            <Education />
          </div>
          <div className="justify-between p-4 leading-normal  bg-resume-box text-white hover:text-black border h-45 rounded-lg shadow-md w-full md:flex-row md:max-w-xl hover:bg-gray-100">
            {CategoryHeader("PROJECTS")}
            <div className="flex">
              <div className="flex-col">
                <div className="text-left block mt-1 leading-tight  text-rose-900 font-bold">
                  List of my projects
                </div>
                <ul className="text-left text-base list-disc ml-8">
                  <Projects />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid mb-2 md:grid-cols-2 ">
          <div className="flex flex-col bg-resume-box text-white border rounded-lg shadow-md w-full md:flex-row md:max-w-xl hover:text-black hover:bg-gray-100">
            <div className="justify-between p-4 leading-normal w-full h-45">
              <Skills />
            </div>
          </div>

          <div className="justify-between p-4 leading-normal  bg-resume-box text-white border h-45 rounded-lg shadow-md w-full md:flex-row md:max-w-xl hover:bg-gray-100 hover:text-black">
            <Experiences />
          </div>
        </div>
      </div>
    </>
  );
};
