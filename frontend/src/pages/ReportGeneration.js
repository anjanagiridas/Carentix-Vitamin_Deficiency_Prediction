import { useState } from "react";

export default function ReportGeneration() {
  const [patientId, setPatientId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setError("");
    setReport(null);
  
    if (!patientId || isNaN(patientId)) {
      setError("⚠️ Please enter a valid Patient ID.");
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/reports?patient_id=${patientId}`);
      const data = await response.json();
      console.log("Report Fetch Response:", data);
  
      if (response.ok) {
        if (data.report) {
          setReport(data.report); // Directly set the single report object
        } else {
          setError("❌ No reports found for this patient.");
        }
      } else {
        setError(data.error || "❌ No report found for this patient.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(`⚠️ Failed to fetch report: ${error.message}`);
    }
  };
  

  return (
    <div>
      <h2>📄 Fetch Patient Report</h2>
      <input
        type="number"
        placeholder="Enter Patient ID"
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={fetchReport}>Get Report</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {report && (
        <div>
          <h3>Report Details</h3>
          <p><strong>Name:</strong> {report?.name || "Not Available"}</p>
          <p><strong>Age:</strong> {report?.age || "Not Available"}</p>
          <p><strong>Gender:</strong> {report?.gender || "Not Available"}</p>
          <p><strong>Symptoms:</strong> {report?.symptoms || "Not Available"}</p>
          <p><strong>Deficiency:</strong> {report?.vitamin_deficiency || "Not Available"}</p>
          <p><strong>Report Date:</strong> {report?.created_at || "Not Available"}</p>

          {report?.image_path?.split(',').map((path, index) => (
            <img
              key={index}
              src={`http://127.0.0.1:5000/${path.trim().replace("\\", "/")}`}
              alt={`Patient ${report.name}'s Report ${index + 1}`}
              width="200px"
              height="200px"
              style={{ objectFit: "cover", margin: "10px" }}
            />
          ))}




        </div>
      )}
    </div>
  );
}
