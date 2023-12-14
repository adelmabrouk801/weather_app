import { createSlice } from "@reduxjs/toolkit";
import { fetchLocationsUponSearchAsync } from "./location.asyncActions";

const initialState = {
  isLoading: false, // idle, failuer, loading
  value: { options: [] },
  errorMessage: "",
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    handleClearErrorMessage: (state) => {
      state.errorMessage = "";
      state.loading = "idle";
    },
    handleSeacrhResults: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocationsUponSearchAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchLocationsUponSearchAsync.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
        console.log("payload: ", action.payload);
      }
    );
    builder.addCase(fetchLocationsUponSearchAsync.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = "Error, Please Try again later";
    });
  },
});

export const { handleClearErrorMessage, handleSeacrhResults } =
  locationSlice.actions;

export const selectLocationStatus = (state) => state.location.isLoading;
export const selectLocationErrorMessage = (state) =>
  state.location.errorMessage;

export const selectLocationS = (state) => state.location.value;

export default locationSlice.reducer;
