import { createSlice } from "@reduxjs/toolkit";

export const stolenSlice = createSlice({
  name: "stolen",
  initialState: {
    stolen: {
      _id: "",
      idAsset: "",
      dateStolen: "",
      investReport_url: "",
      actPublMinistry_url: "",
      employeeNumber: "",
      fullNameEmployee: ""
    },
    isLoading: false,
  },
  reducers: {
    startLoadingStolen: (state) => {
      state.isLoading = true;
    },
    setStolen: (state, action) => {
      state.isLoading = false;
      state.stolen= action.payload.stolen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingStolen, setStolen } = stolenSlice.actions;
