import { createSlice } from "@reduxjs/toolkit";

export const damagedSlice = createSlice({
  name: "damaged",
  initialState: {
    damaged: {
      _id: "",
      employeeNumber: "",
      fullNameEmployee: "",
      investReport_url: "",
      receiPayment_url: "",
      dateDamaged: "",
      idAsset: "",
      ultimateStat: ""
    },
    isLoading: false,
  },
  reducers: {
    startLoadingDamaged: (state) => {
      state.isLoading = true;
    },
    setDamaged: (state, action) => {
      state.isLoading = false;
      state.damaged= action.payload.damaged;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingDamaged, setDamaged } = damagedSlice.actions;