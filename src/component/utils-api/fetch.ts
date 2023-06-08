import { TableTypes } from "../resume";

const handlerError = async (
  res: Response,
  noJSON = false,
  ignoreError = false
) => {
  if (res.status === 401 && !noJSON) console.log("redirect to url");

  const response = noJSON ? res.status : await res.json();
  if (noJSON) {
    if (response === 400 || response === 504)
      throw new Error("egerton time out");
    else throw new Error(response);
  } else if (ignoreError) {
    throw new Error("eddddddddddd");
  } else {
    throw new Error(
      // response?.error || String(response?.errors) || "ddddddddddddddbbbbbb"
      "ddddddddddddddbbbbbb"
    );
  }
};

export const getWrapper = async (url: string) =>
  fetch(url).then((response) => response.json() || []);

// export const getWrapper = async (
//   url: string,
//   signal?: AbortSignal,
//   ignoreError?: boolean
// ) => {
//   fetch(`${url}`, {
//     method: `GET`,
//     credentials: `include`,
//     mode: `cors`,
//     signal,
//   })
//     .then((res) => {
//       const noJSON = !res?.headers
//         ?.get(`content-type`)
//         ?.includes(`application/json`);
//       return res.ok ? res.json() : handlerError(res, noJSON, ignoreError);
//     })
//     .then((data) => data);
// };

export const fetchWrapper = async (
  targetEndpoint: string,
  body: TableTypes,
  postAction: string
) =>
  fetch(`${targetEndpoint}`, {
    method: `${postAction}`,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    //   mode: "cors",
  }).then((data) => data || []);

export const deletWrapperWithID = async (targetEndpoint: string) =>
  fetch(`${targetEndpoint}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    //   mode: "cors",
  }).then((data) => data || []);
