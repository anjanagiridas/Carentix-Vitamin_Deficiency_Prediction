import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import SymptomEntry from "./pages/SymptomEntry";
import Login from "./pages/Login";
import DetectionOptions from "./pages/DetectionOptions";
import About from "./pages/About";
import HelpDesk from "./pages/HelpDesk";
import PatientRegistration from "./pages/PatientRegistration";
import ReportGeneration from "./pages/ReportGeneration";
import ContactUs from "./pages/ContactUs";
import RegisteredMedicalPractitioners from "./pages/RegisteredMedicalPractitioners"; // ✅ Corrected Import

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/symptoms" element={<SymptomEntry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PatientRegistration />} />
        <Route path="/detection-options" element={<DetectionOptions />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpDesk />} />
        <Route path="/reports" element={<ReportGeneration />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/practitioner" element={<RegisteredMedicalPractitioners />} /> {/* ✅ Corrected Route */}
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
