import { Link } from "react-router-dom";
import { Box, Typography, Paper, Container, Grid, AppBar, Toolbar, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function DetectionOptions() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(to bottom, #001829, #2554C7)", // Vertical Gradient Background
        fontFamily: "Montserrat, sans-serif", // Updated font
      }}
    >
      {/* Taskbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1034A6" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", textDecoration: "none", color: "inherit" }}
            component={Link}
            to="/"
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" component={Link} to="/help">
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Detection Options */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "white", mb: 4, fontFamily: "Montserrat, sans-serif" }}>
          How would you like to detect your vitamin deficiency?
        </Typography>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {/* Upload Image Option */}
            <Grid item xs={12} sm={6}>
              <Paper
                component={Link}
                to="/upload"
                elevation={8}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  backgroundColor: "#2554C7", // Sapphire Blue
                  color: "white",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  transition: "transform 0.2s, background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#297EA6", // Lighter Blue on Hover
                    transform: "scale(1.05)",
                  },
                  fontFamily: "Montserrat, sans-serif", // Ensuring consistency
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Upload Image
                </Typography>
              </Paper>
            </Grid>

            {/* Enter Symptoms Option */}
            <Grid item xs={12} sm={6}>
              <Paper
                component={Link}
                to="/symptoms"
                elevation={8}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  backgroundColor: "#2554C7", // Sapphire Blue
                  color: "white",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  transition: "transform 0.2s, background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#297EA6", // Lighter Blue on Hover
                    transform: "scale(1.05)",
                  },
                  fontFamily: "Montserrat, sans-serif", // Ensuring consistency
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Enter Symptoms
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
