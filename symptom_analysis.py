from flask import Blueprint, request, jsonify

symptom_bp = Blueprint("symptom_bp", __name__)

# Sample deficiency-symptoms mapping
deficiency_data = {
    "Vitamin B12 Deficiency": ["Fatigue", "Pale Skin", "Mouth Ulcers"],
    "Iron Deficiency": ["Fatigue", "Pale Skin", "Brittle Nails"],
    "Vitamin A Deficiency": ["Poor Night Vision", "Dry Skin", "Frequent Infections"],
    "Vitamin C Deficiency": ["Bleeding Gums", "Joint Pain", "Frequent Infections"]
}

# Recommendations for deficiencies
recommendations = {
    "Vitamin B12 Deficiency": ["Eat more meat, dairy, and eggs.", "Consider B12 supplements."],
    "Iron Deficiency": ["Eat leafy greens and red meat.", "Take iron supplements if needed."],
    "Vitamin A Deficiency": ["Consume carrots, sweet potatoes, and dairy.", "Use vitamin A-rich skincare."],
    "Vitamin C Deficiency": ["Increase intake of citrus fruits and bell peppers.", "Take vitamin C supplements."]
}

@symptom_bp.route("/predict_deficiency", methods=["POST"])
def predict_deficiency():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    best_match = None
    max_matches = 0

    for deficiency, deficiency_symptoms in deficiency_data.items():
        matches = len(set(symptoms) & set(deficiency_symptoms))
        if matches > max_matches:
            max_matches = matches
            best_match = deficiency

    if best_match:
        response = {
            "deficiency": best_match,
            "recommendations": recommendations.get(best_match, [])
        }
    else:
        response = {
            "deficiency": "No clear deficiency detected.",
            "recommendations": ["Consult a doctor for further evaluation."]
        }

    return jsonify(response)
