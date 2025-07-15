import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import alexnet_model
from symptom_analysis import symptom_bp  # Import symptom analysis module
import sqlite3
import bcrypt
import jwt
from flask import send_from_directory


app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Add this line

CORS(app, supports_credentials=True, origins="http://localhost:3000")

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Register symptom blueprint
app.register_blueprint(symptom_bp)

def process_images(image_paths):
    return alexnet_model.deep_learning_prediction(image_paths)

def save_report(patient_id, deficiency, image_paths):
    """Save detected deficiency in the database."""
    conn = sqlite3.connect(os.path.join("frontend", "backend", "database.sqlite"))


    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reports (patient_id, vitamin_deficiency, image_path)
        VALUES (?, ?, ?)
    """, (patient_id, deficiency, ",".join(image_paths)))
    conn.commit()
    conn.close()

@app.route("/reports", methods=["GET"])
@app.route("/reports", methods=["GET"])
def get_reports():
    patient_id = request.args.get("patient_id")
    
    if not patient_id:
        return jsonify({"error": "Patient ID is required"}), 400

    try:
        conn = sqlite3.connect("frontend/backend/database.sqlite")
        cursor = conn.cursor()

        # Perform a JOIN to fetch patient details along with the report
        cursor.execute("""
            SELECT patients.name, patients.age, patients.gender, patients.symptoms, 
                   reports.vitamin_deficiency, reports.created_at, reports.image_path
            FROM reports
            JOIN patients ON reports.patient_id = patients.patient_id
            WHERE reports.patient_id = ?
        """, (patient_id,))
        
        report = cursor.fetchone()
        conn.close()

        if not report:
            return jsonify({"error": "No report found for this patient"}), 404

        # Ensure report contains all the expected data
        if len(report) < 7:
            return jsonify({"error": "Incomplete report data"}), 500

        # Structure the data properly
        report_data = {
            "name": report[0],
            "age": report[1],
            "gender": report[2],
            "symptoms": report[3],
            "vitamin_deficiency": report[4],
            "created_at": report[5],
            "image_path": report[6]
        }

        return jsonify({"report": report_data}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight passed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 204


    print("Login endpoint reached")
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = sqlite3.connect(os.path.join("frontend", "backend", "database.sqlite"))
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, password FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if not user or not bcrypt.checkpw(password.encode(), user[1].encode()):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({"email": email}, SECRET_KEY, algorithm="HS256")
    print("Login Response:", {"token": token, "patient_id": user[0]})
    return jsonify({"token": token, "patient_id": user[0]})



@app.route("/upload", methods=["POST"])
def upload_files():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist("file")

    if not files or all(file.filename == "" for file in files):
        return jsonify({"error": "No selected files"}), 400

    patient_id = request.form.get("patient_id")
    if not patient_id:
        return jsonify({"error": "Patient ID is required"}), 400

    image_paths = []
    try:
        for file in files:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)
            image_paths.append(file_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


    result = process_images(image_paths)

    # Save Report
    save_report(patient_id, result, image_paths)

    return jsonify({"result": result, "image_paths": image_paths, "message": "Report saved successfully"})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == "__main__":
    app.run(debug=True)
