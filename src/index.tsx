import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  QueryCache,
  QueryClient,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { store } from "./component/utils-api/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries:{
  //     refectOnWindowFocus: false,
  //     retry: false
  //   }
  // },
  // queryCache: new QueryCache({
  //   onError: (error: Error | string) => {
  //     if(error !== "Missing queryFn" && typeof error !== `string` && error.message !== `IGNORE_ERROR`)
  //       store.dispatch(
  //         addMessage({type: `error`, value: typeof error !== `string` && error.message})
  //       )
  //   }
  // }),
  // mutationCache: new MutationCache({
  //   onError: (error: Error) => {
  //     StorageEvent.dispatch(addMessage({type: `error`. value: error.message}));
  //   }
  // })
});

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
