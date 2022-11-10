import { createSlice } from "@reduxjs/toolkit";

export const lendSlice = createSlice({
  name: "lend",
  initialState: {
    lend: {
      _id: "",
      employeeNumber: "",
      name:  "",
      lastname: "",
      area: "",
      immBoss: "",
      dateLendInit: "",
      dateLendFinish: "",
      urlPdf: "",
      idAsset: "",
    },
    isLoading: false,
  },
  reducers: {
    startLoadingLend: (state) => {
      state.isLoading = true;
    },
    setLend: (state, action) => {
      state.isLoading = false;
      state.lend= action.payload.lend;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingLend, setLend } = lendSlice.actions;
