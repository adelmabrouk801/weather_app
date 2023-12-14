import { createAsyncThunk } from "@reduxjs/toolkit";
import { geoApiOptions, geoApiUrl } from "../../healpers";

export const fetchLocationsUponSearchAsync = createAsyncThunk(
  "locations/fetchLocationUponSearch",
  async ({ inputValue }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${geoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }

      const data = await response.json();
      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      return rejectWithValue("Error, Please try again later");
    }
  }
);
