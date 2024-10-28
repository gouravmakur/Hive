import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : [],
    userPosts : []
}

const postSlice = createSlice({

    name : 'posts',
    initialState,
    reducers : {

        getPosts :(state ,action) => {
            state.posts = action.payload.posts;
        },

        getUserPost : (state , action) => {
            state.userPosts = action.payload.userPosts;
        }
    }
})

export const {getPosts, getUserPost} = postSlice.actions;
const postReducers = postSlice.reducer;
export default postReducers;