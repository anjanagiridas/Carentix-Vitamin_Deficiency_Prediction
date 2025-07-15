require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key"; // Change this in production

app.use(express.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
    }
});

// ✅ Create Tables (Users, Patients, Reports)
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS patients (
        patient_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        symptoms TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)

    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS reports (
        report_id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        vitamin_deficiency TEXT NOT NULL,
        image_path TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
    )
`);

// ** User Registration **
app.post('/register', (req, res) => {
    const { name, email, password, age, gender, symptoms } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    // Insert into Users table
    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
    [name, email, hashedPassword], 
    function(err) {
      if (err) {
        return res.status(400).json({ error: "Email already exists" });
      }
      
      const userId = this.lastID;
  
      // Insert into Patients table using user_id as patient_id
      db.run(`INSERT INTO patients (patient_id, user_id, name, age, gender, symptoms) VALUES (?, ?, ?, ?, ?, ?)`, 
      [userId, userId, name, age, gender, symptoms], 
      function(err) {
        if (err) {
          console.error('❌ Error inserting into patients:', err.message);
          return res.status(400).json({ error: "Failed to register patient: " + err.message });
        }
        res.json({ message: "User and patient registered successfully", userId, patientId: userId });
      });
  
    });
});
  


// ** User Login **
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Fetch patient_id using user_id
        db.get(`SELECT patient_id FROM patients WHERE user_id = ?`, [user.user_id], (err, patient) => {
            if (err || !patient) {
                return res.status(404).json({ error: "Patient record not found" });
            }

            const token = jwt.sign({ id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            // Return both token and patient_id
            res.json({ message: "Login successful", token, patient_id: patient.patient_id });
        });
    });
});


// ** Patient Registration + Auto Report Generation **
app.post('/patients', (req, res) => {
    const { name, age, gender, symptoms } = req.body;

    db.run(`INSERT INTO patients (name, age, gender, symptoms) VALUES (?, ?, ?, ?)`, 
    [name, age, gender, symptoms], 
    function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const patientId = this.lastID;
        console.log("✅ New Patient Registered. ID:", patientId);

        // Generate a dummy AI report (replace with actual AI model call)
        const vitaminDeficiency = "Vitamin D Deficiency";  // Replace with AI model prediction
        const imagePath = "/images/sample.jpg"; // Replace with AI-generated image path

        db.run(
            `INSERT INTO reports (patient_id, vitamin_deficiency, image_path) VALUES (?, ?, ?)`,
            [patientId, vitaminDeficiency, imagePath],
            function (reportErr) {
                if (reportErr) {
                    console.error("❌ Report Generation Error:", reportErr.message);
                } else {
                    console.log("✅ Report Generated for Patient ID:", patientId);
                }
            }
        );

        res.json({ message: "Patient registered successfully", patientId });
    });
});

// ** Fetch All Patients **
app.get('/patients', (req, res) => {
    db.all(`SELECT * FROM patients`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// ✅ **Save AI Report (Triggered in /patients)**
app.post('/save-report', (req, res) => {
    const { patient_id, vitamin_deficiency, image_path } = req.body;

    db.run(
        `INSERT INTO reports (patient_id, vitamin_deficiency, image_path) VALUES (?, ?, ?)`,
        [patient_id, vitamin_deficiency, image_path],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: "Report saved successfully", reportId: this.lastID });
        }
    );
});

// ✅ **Fetch Latest Report for a Patient**
app.get('/reports', (req, res) => {
    const { patient_id } = req.query;

    db.get(
        `SELECT patients.name, patients.age, patients.gender, patients.symptoms, 
                reports.vitamin_deficiency, reports.image_path, reports.created_at
         FROM reports 
         JOIN patients ON reports.patient_id = patients.patient_id
         WHERE reports.patient_id = ? ORDER BY reports.created_at DESC LIMIT 1`,
        [patient_id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: "No report found for this patient" });
            }
            res.json(row);
        }
    );
});

// ** Start the server **
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
