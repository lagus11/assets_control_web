import { createSlice } from "@reduxjs/toolkit";

export const lostSlice = createSlice({
  name: "lost",
  initialState: {
    lost: {
      _id: "",
      idAsset: "",
      dateLost: "",
      investReport_url: "",
      receiPayment_url: "",
      employeeNumber: "",
      fullNameEmployee: ""
    },
    isLoading: false,
  },
  reducers: {
    startLoadingLost: (state) => {
      state.isLoading = true;
    },
    setLost: (state, action) => {
      state.isLoading = false;
      state.lost= action.payload.lost;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingLost, setLost } = lostSlice.actions;
