import React from "react";
import { Box, Typography } from "@mui/material";

export default function RegisteredMedicalPractitioners() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: "100vh",
        backgroundColor: "#F5EFE6", // Cream background
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "#2554C7" }} // Sapphire Blue heading
      >
        Registered Medical Practitioners
      </Typography>
      <iframe
        src="/doctor.pdf"
        title="Registered Medical Practitioners"
        width="100%"
        height="600px"
        style={{ border: "none" }}
      />
    </Box>
  );
}

