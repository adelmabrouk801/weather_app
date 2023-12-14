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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box sx={{ background: "#24353E", width: "100%", height: "100vh" }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={(theme) => ({
            color: "white",
            fontSize: "50px",
            [theme.breakpoints.down("md")]: {
              fontSize: "25px",
            },
          })}
        >
          Detailed Weather Day Information
        </Typography>
        <Typography
          sx={(theme) => ({
            color: "white",
            fontSize: "25px",
            [theme.breakpoints.down("md")]: {
              fontSize: "15px",
            },
          })}
        >
          Drag And see The weather every three hours{" "}
        </Typography>
      </Grid>

      <Slider {...sliderSettings}>
        {receivedData.map((day) => (
          <div key={day.dt}>
            <Box
              sx={(theme) => ({
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
                [theme.breakpoints.down("md")]: {
                  width: "80vw",
                  height: "auto",
                  fontSize: "50%",
                },
              })}
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Typography
                    sx={(theme) => ({
                      fontSize: "25px",
                      [theme.breakpoints.down("md")]: {
                        fontSize: "18px",
                      },
                    })}
                  >
                    {" "}
                    {moment(new Date(day.dt_txt)).format(
                      "dddd , Do MMMM YYYY, h:mm:ss a"
                    )}
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      fontSize: "20px",
                      [theme.breakpoints.down("md")]: {
                        fontSize: "15px",
                      },
                    })}
                  >
                    {day.weather[0].description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "12px",
                  },
                })}
              >
                <Typography
                  sx={(theme) => ({
                    margin: "10px ",
                    fontWeight: 600,
                    fontSize: "70px",
                    width: "auto",
                  })}
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
              <Grid
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "space-around",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "12px",
                  },
                })}
              >
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
