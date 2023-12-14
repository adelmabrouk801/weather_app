import React from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { Typography, Grid, Box, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";

export const DetailedWeather = () => {
  const location = useLocation();
  const receivedData = location.state;
  console.log("RECEIVED DATA", receivedData);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ background: "#24353E", width: "100%", height: "100vh" }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          margin: "25px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "50px" }}>
          Detailed Weather Day Information
        </Typography>
        <Typography sx={{ color: "white", fontSize: "30px" }}>
          Drag And see The weather every three hours{" "}
        </Typography>
      </Grid>

      <Slider {...sliderSettings}>
        {receivedData.map((day) => (
          <div key={day.dt}>
            <Box
              sx={{
                width: "750px",
                height: "425px",
                boxShadow: "10px -2px 20px 2px rgba(0 0 0 / 20%)",
                background: "linear-gradient(180deg, #499DA5 0%, #377BE2 100%)",
                color: "#FFF",
                margin: "20px auto 0 auto",
                padding: "0 20px 20px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                borderRadius: "32px",
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
                  <Typography sx={{ fontSize: "25px" }}>
                    {" "}
                    {moment(new Date(day.dt_txt)).format(
                      "dddd , Do MMMM YYYY, h:mm:ss a"
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: "20px" }}>
                    {day.weather[0].description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    margin: "10px ",
                    fontWeight: 600,
                    fontSize: "70px",
                    width: "auto",
                  }}
                >
                  {Math.round(day.main.temp)}°C
                </Typography>

                <Grid>
                  <Grid>
                    <img
                      src={`/icons/${day.weather[0].icon}.png`}
                      alt="Weather"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    fontSize: "20px",
                  }}
                >
                  <span>Feels Like</span>
                  <span>{Math.round(day.main.feels_like)}°C</span>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "20px",
                  }}
                >
                  <span>Wind Speed</span>
                  <span>{day.wind.speed} Km/hr</span>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    fontSize: "20px",
                  }}
                >
                  <span>Humidity</span>
                  <span>{day.main.humidity} %</span>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    fontSize: "20px",
                  }}
                >
                  <span>Pressure</span>
                  <span>{day.main.pressure} hpa</span>
                </Grid>
              </Grid>
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
};
