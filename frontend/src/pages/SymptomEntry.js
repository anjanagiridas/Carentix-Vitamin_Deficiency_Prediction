import { useState } from "react";
import { Box, Button, Typography, CircularProgress, Link, AppBar, Toolbar, IconButton, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SymptomEntry() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const symptomsList = [
    "Fatigue", "Pale Skin", "Hair Loss", "Brittle Nails", "Mouth Ulcers", 
    "Bleeding Gums", "Poor Night Vision", "Dry Skin", "Joint Pain", "Frequent Infections"
  ]; // Add more symptoms as needed

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_deficiency", { symptoms: selectedSymptoms });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching deficiency:", error);
      alert("Error fetching deficiency. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8F3E1, #E1D8B0)",
        padding: 2,
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1034A6", zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ cursor: "pointer", letterSpacing: 1.5, fontSize: "1.2rem" }}
            onClick={() => navigate("/")}
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Heading */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#1034A6", marginBottom: 3 }}>
          Select Your Symptoms
        </Typography>
      </motion.div>

      {/* Symptom Selection */}
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select Symptoms</InputLabel>
          <Select
            multiple
            value={selectedSymptoms}
            onChange={(e) => setSelectedSymptoms(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {symptomsList.map((symptom) => (
              <MenuItem key={symptom} value={symptom}>
                {symptom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || selectedSymptoms.length === 0}
            sx={{
              padding: "15px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              backgroundColor: selectedSymptoms.length ? "#1034A6" : "gray",
              "&:hover": { backgroundColor: selectedSymptoms.length ? "#2554C7" : "gray" },
              borderRadius: "10px",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Symptoms"}
          </Button>
        </motion.div>
      </form>

      {/* Display Results */}
      {result && (
        <Box
          sx={{
            marginTop: 3,
            padding: 3,
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Deficiency Detected:
          </Typography>
          <Typography>{result.deficiency}</Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            Recommendations:
          </Typography>
          <ul>
            {result.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Box>
      )}

      {/* Link to Reports Page */}
      <Link component={RouterLink} to="/reports" sx={{ marginTop: 3, color: "#2554C7", textDecoration: "underline" }}>
        Go to Reports
      </Link>
    </Box>
  );
}
