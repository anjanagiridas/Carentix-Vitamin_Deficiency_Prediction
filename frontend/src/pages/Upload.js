import { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Typography, AppBar, Toolbar, IconButton, Paper } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [images, setImages] = useState([]); // Store multiple images
  const [error, setError] = useState(null); // Error state now used in UI
  const [result, setResult] = useState(""); // Store API response
  const [previews, setPreviews] = useState([]); // Store multiple image previews
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // Validate images
    const validImages = selectedFiles.filter((file) => file.type.startsWith("image/"));
    
    if (validImages.length === 0) {
      setError("Please upload valid image files.");
      setPreviews([]);
      setImages([]);
    } else {
      setError(null);
      setImages(validImages);
      setPreviews(validImages.map((file) => URL.createObjectURL(file))); // Generate previews
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Please select at least one image before uploading.");
      return;
    }
  
    const patientId = localStorage.getItem("patient_id"); // Get stored patient ID
    console.log("Retrieved Patient ID:", patientId);

    if (!patientId) {
      setError("Patient ID not found. Please login again.");
      return;
    }
  
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("patient_id", patientId); // Append patient ID
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setResult(response.data.result);
    } catch (error) {
      console.error("Error uploading files:", error);
      setError("Failed to upload images. Please try again.");
    }
  };
  

  return (
    
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #F8F3E1, #E1D8B0)",
        paddingTop: "64px",
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#1034A6", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 10 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#2554C7" }}>
          Upload Images
        </Typography>

        <input type="file" multiple onChange={handleFileChange} style={{ marginBottom: "20px" }} />

        {/* Show image previews */}
        {previews.length > 0 && previews.map((src, index) => (
          <img key={index} src={src} alt={`Preview ${index + 1}`} style={{ width: "80px", height: "80px" }} />
        ))}

        {/* Display error messages */}
        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        <Button variant="contained" disabled={images.length === 0} onClick={handleUpload} sx={{ mt: 2 }}>
          Analyze
        </Button>

        {/* Display Prediction Result */}
        {result && (
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Final Prediction: {result}</Typography>
          </Paper>
        )}
      </Container>
      
    </Box>
    
  );
}
