import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    role: {
      type: {
        name: "",
      },
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role.type.name = action.payload.role.type.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
