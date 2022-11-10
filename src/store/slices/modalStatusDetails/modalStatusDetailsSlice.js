import { createSlice } from "@reduxjs/toolkit";

export const modalStatusDetailsSlice = createSlice({
  name: "modalStatusDetails",
  initialState: {
    assetStatusDetails: {
      tag: "",
      make: "",
      model: "",
      serial_number: "",
      status: "",
    },
    isOpenModalStatusDetails: false
  },
  reducers: {
    setAssetStatusDetails: (state, action) => {
      state.assetStatusDetails= action.payload.assetStatusDetails;
    },

    OpenModalStatusDetails: (state) => {
      state.isOpenModalStatusDetails = true;
    },
    closeModalStatusDetails: (state) => {
      state.isOpenModalStatusDetails = false
    },
  },
});

// Action creators are generated for each case reducer function
export const { OpenModalStatusDetails, closeModalStatusDetails, setAssetStatusDetails } = modalStatusDetailsSlice.actions;
