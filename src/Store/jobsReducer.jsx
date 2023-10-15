import { createSlice } from "@reduxjs/toolkit";

const initialApiStatus = "Initial";

const initialState = {
  jobs: { currLang: "", list: [] },
  jobDetailsObj: {},
  apiStatus: initialApiStatus,
  language: "",
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addToJobsList: (state, action) => {
      state.jobs.currLang = action.payload.language;
      state.jobs.list = [...action.payload.jobsListData];
    },
    addJobDetailsObj: (state, action) => {
      state.jobDetailsObj = action.payload;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { addToJobsList, addJobDetailsObj, setApiStatus, setLanguage } =
  jobsSlice.actions;
export default jobsSlice.reducer;
