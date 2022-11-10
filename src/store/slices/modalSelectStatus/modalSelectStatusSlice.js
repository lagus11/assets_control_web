import { createSlice } from "@reduxjs/toolkit";

export const modalSelectStatusSlice = createSlice({
  name: "modalSelectStatus",
  initialState: {
    assetSelectStatus: {
      tag: "",
      make: "",
      model: "",
      serial_number: "",
      status: "",
    },
    isOpenModalSelectStatus: false,
    employee: {
      employeeNumber: "",
      fullNameEmployee: "",
    }
  },
  reducers: {
    setAssetSelectStatus: (state, action) => {
      state.assetSelectStatus= action.payload.assetSelectStatus;
    },

    setEmployeeSelectStatus: (state, action) => {
      state.employee = action.payload.employeeSelectStatus;
    },

    OpenModalSelectStatus: (state) => {
      state.isOpenModalSelectStatus = true;
    },

    closeModalSelectStatus: (state) => {
      state.isOpenModalSelectStatus = false
    },
  },
});

// Action creators are generated for each case reducer function
export const { OpenModalSelectStatus, closeModalSelectStatus, setAssetSelectStatus, setEmployeeSelectStatus } = modalSelectStatusSlice.actions;
