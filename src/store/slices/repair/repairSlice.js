import { createSlice } from "@reduxjs/toolkit";

export const repairSlice = createSlice({
  name: "repair",
  initialState: {
    repair: {
      _id: "",
      idAsset: "",
      dateRepair: "",
      invoice_url: "",
      supplier: "",
      ultimateStat: ""
    },
    isLoading: false,
  },
  reducers: {
    startLoadingRepair: (state) => {
      state.isLoading = true;
    },
    setRepair: (state, action) => {
      state.isLoading = false;
      state.repair= action.payload.repair;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingRepair, setRepair } = repairSlice.actions;
