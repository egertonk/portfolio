import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { projectReducer } from "../site-States/resume.slice";

// Use the react store to save hold states values
export const store = configureStore({
  reducer: {
    resume: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useEgertonDisptach: () => AppDispatch = useDispatch;
export const useEgertonSelector: TypedUseSelectorHook<RootState> = useSelector;
