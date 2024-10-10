import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userAppointments: [],
  isLoggin: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.userAppointments = action.payload.appointments || [];
      state.isLoggin = true;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.error = action.payload.error;
    },

    logout: (state) => {
      state.user = null;
      state.userAppointments = [];
      state.isLoggin = false;
    },

    setUserAppointments: (state, action) => {
      state.userAppointments = Array.isArray(action.payload.appointments) 
      ? action.payload.appointments 
      : [];
    }
  },
});

export const { loginSuccess, loginFailure, logout, setUserAppointments } = userSlice.actions;
export default userSlice.reducer;
