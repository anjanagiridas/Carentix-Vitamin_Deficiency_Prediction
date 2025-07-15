import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion } from "framer-motion";

const images = ["/carousel1.jpg", "/carousel2.jpg"];

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
      {/* Taskbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1034A6", zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <motion.div animate={{ rotate: drawerOpen ? 90 : 0 }}>
                <GridViewRoundedIcon />
              </motion.div>
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 1, fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
              CARENTIX
            </Typography>
          </Box>
          <IconButton component={Link} to="/help" color="inherit">
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#2554C7",
            color: "white",
            paddingTop: "80px",
            fontFamily: "Montserrat, sans-serif",
          },
        }}
      >
        <List>
          {[ 
            { text: "About Us", path: "/about" },
            { text: "Patient Registration", path: "/register" },
            { text: "Login", path: "/login" },
            { text: "Reports", path: "/reports" },
            { text: "Registered Medical Practitioner", path: "/practitioner" },
            { text: "Contact Us", path: "/contact" },
          ].map((item, index) => (
            <Box key={item.text}>
              <ListItem
                button
                component={Link}
                to={item.path}
                sx={{
                  padding: 2,
                  "&:hover": { backgroundColor: "#6495ED" },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                />
              </ListItem>
              {index < 5 && <Divider sx={{ backgroundColor: "white" }} />}
            </Box>
          ))}
        </List>
      </Drawer>

      {/* Sliding Image Carousel */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : "-100%",
            }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {images.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: index === currentIndex ? "white" : "gray",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
