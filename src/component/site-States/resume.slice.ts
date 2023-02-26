import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Setup types
type projectState = {
  resumeName: string;
};

// Setup initial states
const initialState = (): projectState => ({
  resumeName: "",
});

// creating the slice for set states
const projectSlice = createSlice({
  name: "egerton-projects",
  initialState: initialState(),
  reducers: {
    setResumeName(state, { payload }: PayloadAction<string>) {
      state.resumeName = payload;
    },
  },
});

// Export set states
export const { setResumeName } = projectSlice.actions;

// Export reducer
export const projectReducer = projectSlice.reducer;
