import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer.js";

const store = configureStore({
    reducer: {
        userSlice: userReducer
    }
})

export default store;