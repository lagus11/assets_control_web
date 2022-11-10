import { createSlice } from "@reduxjs/toolkit";

export const assignationSlice = createSlice({
  name: "assignation",
  initialState: {
    assignation: {
      _id: "",
      employeeNumber: "",
      name:  "",
      lastname: "",
      area: "",
      immBoss: "",
      urlPdf: "",
      idAsset: "",
      dateAssignation: ""
    },
    isLoading: false,
  },
  reducers: {
    startLoadingAssignation: (state) => {
      state.isLoading = true;
    },
    setAssignation: (state, action) => {
      state.isLoading = false;
      state.assignation = action.payload.assignation;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingAssignation, setAssignation } = assignationSlice.actions;
