import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, Paper, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#FFF5E1", minHeight: "100vh", paddingBottom: 4 }}>
      {/* Taskbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1034A6" }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "Montserrat, sans-serif", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}> 
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contact Information */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: "#FFF", borderRadius: "12px" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", fontFamily: "Montserrat, sans-serif", color: "#2554C7" }}>
            Get in Touch
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, fontFamily: "Montserrat, sans-serif", color: "#2554C7" }}>
            <strong>Email:</strong> thenteam@gmail.com, nteamsupport@gmail.com
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontFamily: "Montserrat, sans-serif", color: "#2554C7" }}>
            <strong>Phone:</strong> +91 9037799841, +91 7736212484
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
