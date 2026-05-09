from flask import Flask, request, jsonify
from flask_cors import CORS
from emotionAnalyzer import analyze_emotion

# Initialize App
app = Flask(__name__)
CORS(app)

# Get Results
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ML service running"
    }), 200

# Analyze route
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()

        # Check if Journal entry
        if not data or "text" not in data:
            return jsonify({
                "message": "Text is required"
            }), 400

        text = data.get("text", "")
        emotion = analyze_emotion(text)

        return jsonify({
            "emotion": emotion
        }), 200

    except Exception as error:
        return jsonify({
            "message": "Emotion analysis failed",
            "error": str(error)
        }), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)