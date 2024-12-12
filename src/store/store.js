import { configureStore } from "@reduxjs/toolkit";
import storySlice from "./storySlice";

const store = configureStore({
  reducer: {
    story: storySlice,
  },
});

export default store;