import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "./styledTable";

export const ForecastTable = ({ data }) => {
  const navigate = useNavigate();
  const [groupedDayWeather, setGroupedDayWeather] = useState({});

  useEffect(() => {
    function groupForecastsByDate(forecasts) {
      const groupedForecasts = {};
      forecasts.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0]; // Extracting the date part
        if (!groupedForecasts[date]) {
          groupedForecasts[date] = [];
        }
        groupedForecasts[date].push(forecast);
      });
      return groupedForecasts;
    }

    const groupedData = groupForecastsByDate(data.list);
    setGroupedDayWeather(groupedData);
  }, [data]);

  const handleClick = (dayData) => {
    navigate("/details", { state: dayData });
  };

  return (
    <TableContainer component={Paper} sx={{ margin: "50px 0 " }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Temperature (°C)</StyledTableCell>
            <StyledTableCell align="center"> Weather Status</StyledTableCell>
            <StyledTableCell align="center">Weather Icon</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedDayWeather).map((date) => {
            const firstForecastOfDay = groupedDayWeather[date][0];
            return (
              <StyledTableRow
                key={firstForecastOfDay.dt}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleClick(groupedDayWeather[date])}
                hover
              >
                <StyledTableCell align="center">
                  {moment(new Date(firstForecastOfDay.dt_txt)).format(
                    "Do MMMM YYYY , dddd"
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Math.round(firstForecastOfDay.main.temp_max)}°C /{" "}
                  {Math.round(firstForecastOfDay.main.temp_min)}°C
                </StyledTableCell>
                <StyledTableCell align="center">
                  {firstForecastOfDay.weather[0].description}
                </StyledTableCell>
                <StyledTableCell padding="none" align="center">
                  <img
                    src={`icons/${firstForecastOfDay.weather[0].icon}.png`}
                    alt="weather"
                    style={{ width: "50px" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
