import { createSlice } from "@reduxjs/toolkit";

export const assetDetailsSlice = createSlice({
  name: "assetDetails",
  initialState: {
    assetDetails: {
      _id: "",
      tag: "",
      make: "",
      model: "",
      serial_number: "",
      asset_code: "",
      asset_type: "",
      equipment_type: "",
      status: "",
      invoice: "",
      supplier: "",
      asset_company: "",
      location: "",
      datePurchase: "",
      dateRegistration: "",
      observation: "",
      mobileDetail: "",
      desktopDetail: ""
    },
    isLoading: false,
    isOpenModalAssetDetails: false
  },
  reducers: {
    startLoadingAssetDetails: (state) => {
      state.isLoading = true;
    },
    setAssetDetails: (state, action) => {
      state.isLoading = false;
      state.assetDetails = action.payload.assetDetails;
    },

    openModalAssetDetails: (state) => {
      state.isOpenModalAssetDetails = true;
    },

    closeModalAssetDetails: (state) => {
      state.isOpenModalAssetDetails = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingAssetDetails, setAssetDetails, openModalAssetDetails, closeModalAssetDetails } = assetDetailsSlice.actions;
