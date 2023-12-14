import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../locations/location.reducer";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
