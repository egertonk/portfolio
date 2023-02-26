import React from "react";
import { NavMenu } from "../resume";
import { useGetUser } from "../utils-api/get.API";

export const Finance = () => {
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
      <p>Egerton During dddddddddddddddddddddd</p>
    </>
  );
};
