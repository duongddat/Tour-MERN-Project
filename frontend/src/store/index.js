import { configureStore } from "@reduxjs/toolkit";
import messageReduce from "./message-slice.js";

const store = configureStore({
  reducer: {
    message: messageReduce,
  },
});

export default store;
