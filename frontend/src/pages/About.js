import { Box, Typography, Container, AppBar, Toolbar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#FAF3E0", // Soft off-white / cream
        color: "#1034A6", // Deep blue text
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Taskbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1034A6", boxShadow: "none" }}>
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              flexGrow: 1,
              letterSpacing: 1.5,
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")} // Navigate to Home on click
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ padding: "40px 20px", fontFamily: "Montserrat, sans-serif" }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Welcome to <strong>CARENTIX</strong>! We are a team of innovators dedicated to transforming healthcare through the power of deep learning and AI-driven technology.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ marginBottom: "50px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1">
            At <strong>CARENTIX</strong>, we believe in the power of early detection to prevent long-term health issues.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} style={{ marginBottom: "50px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Technology
          </Typography>
          <Typography variant="body1">
            <strong>CARENTIX</strong> leverages advanced deep learning algorithms trained on extensive datasets.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} style={{ marginBottom: "50px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Meet the Team
          </Typography>
          <Typography variant="body1">
            Our dedicated team of AI enthusiasts and healthcare innovators:
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Niveditha Prasad</strong> – Backend & Database Development
          </Typography>
          <Typography variant="body2">
            <strong>Anjana Giridas</strong> – Deep Learning & Model Training
          </Typography>
          <Typography variant="body2">
            <strong>Niveditha Shaji</strong> – Frontend Development & System Architecture
          </Typography>
          <Typography variant="body2">
            <strong>Nidhi Jaimon</strong> – UI/UX & Frontend Engineering
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Together, we are committed to leveraging deep learning to improve healthcare accessibility.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} style={{ marginBottom: "50px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Commitment
          </Typography>
          <Typography variant="body1">
            We continuously enhance our AI models to ensure higher accuracy and usability.
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 3 }}>
            Thank you for being a part of our journey! 💙
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
