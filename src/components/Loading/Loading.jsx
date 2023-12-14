import React from "react";

import { Box, Typography, CircularProgress } from "@mui/material";

export const LoadingProgress = ({ loading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "#f4f4f4f2",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%",
        zIndex: 9,
      }}
    >
      <CircularProgress />
      <Typography variant="h6">Loading ...</Typography>
    </Box>
  );
};

LoadingProgress.defaultProps = {
  loading: false,
};

export default LoadingProgress;
