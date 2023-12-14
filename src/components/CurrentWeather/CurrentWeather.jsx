import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export const CurrentWeather = ({ data }) => {
  return (
    <Box
      sx={{
        width: "300px",
        borderRadius: "6px",
        boxShadow: "10px -2px 20px 2px rgba(0 0 0 / 20%)",
        backgroundColor: "#24353E",
        color: "#FFF",
        margin: "20px auto 0 auto",
        padding: "0 20px 20px 20px",
        border: "1px solid #FFFFFF,",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid>
          <Typography>{data.city}</Typography>
          <Typography>{data.weather[0].description}</Typography>
        </Grid>
        <img src={`/icons/${data.weather[0].icon}.png`} alt="Weather" />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            margin: "10px 0px",
            fontWeight: 600,
            fontSize: "65px",
            width: "auto",
          }}
        >
          {Math.round(data.main.temp)}°C
        </Typography>
        <Grid>
          <Grid>
            <Typography> Details </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Feels Like :</span>
            <span>{Math.round(data.main.feels_like)}°C</span>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Wind :</span>
            <span>{data.wind.speed} Km/hr</span>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Humidity :</span>
            <span>{data.main.humidity} %</span>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Pressure :</span>
            <span>{data.main.pressure} hpa</span>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
