import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchLocationsUponSearchAsync } from "../../redux/locations/location.asyncActions";

export const Search = ({ onSearchChange, onLocateMe }) => {
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();

  // Use selectors to access Redux state
  const isLoading = useSelector((state) => state.location.isLoading);
  const locations = useSelector((state) => state.location.value);
  const error = useSelector((state) => state.location.errorMessage);
  console.log(locations);
  const handleSearch = (event, newValue) => {
    setSearch(newValue);
    onSearchChange(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    dispatch(
      fetchLocationsUponSearchAsync({
        inputValue: newInputValue,
      })
    );
  };
  useEffect(() => {
    // Fetch initial data when the component mounts
    dispatch(fetchLocationsUponSearchAsync({ inputValue: "A" }));
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        marginTop: "25px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid sx={{ width: "80%" }}>
        <Autocomplete
          id="search-autocomplete"
          options={locations.options}
          loading={isLoading}
          getOptionLabel={(option) => option?.label || ""}
          onChange={handleSearch}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter The City"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <IconButton onClick={onLocateMe} color="primary" size="large">
        <MyLocationIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};
