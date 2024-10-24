import { configureStore } from "@reduxjs/toolkit";
import authReducers from './AuthSlice'

const store = configureStore({
    reducer : {
        auth : authReducers
    }
});

export default store;

 