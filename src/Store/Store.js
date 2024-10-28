import { configureStore } from "@reduxjs/toolkit";
import authReducers from './AuthSlice'
import postReducers from "./PostSlice";

const store = configureStore({
    reducer : {
        auth : authReducers,
        posts : postReducers
    }
});

export default store;

 