import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: "story",
    initialState: {
        stories: [],
        passedStories: [],
        currentPage: 1,
        currentPage2: 1,    
        currentPageStories: [],
    },
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload;
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        setCurrentPage2: (state, action) => {
            state.currentPage2 = action.payload;
        }

        
    }
})

export const {setStories , setCurrentPage , setCurrentPage2} = storySlice.actions;
export default storySlice.reducer;