import { useState } from "react";
import {
  Box,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { question: "How does the Vitamin Deficit Finder work?", answer: "It analyzes uploaded images and symptoms to detect potential vitamin deficiencies using AI." },
  { question: "What types of images can I upload?", answer: "You can upload clear images of your skin, eyes, or nails for analysis." },
  { question: "How accurate is the detection?", answer: "While our model is trained on a diverse dataset, results should be reviewed by a healthcare professional." },
  { question: "Can I enter symptoms instead of an image?", answer: "Yes, you can manually input symptoms to receive an analysis." },
];

export default function HelpDesk() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Help Desk
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <Accordion key={index} sx={{ backgroundColor: "#2554C7", color: "white", marginBottom: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
              <Typography fontWeight="bold">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography align="center" color="gray">No matching FAQs found.</Typography>
      )}
    </Box>
  );
}
