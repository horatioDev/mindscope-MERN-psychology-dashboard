# Import Flask framework utilities
from flask import Flask, request, jsonify

# Import CORS support so frontend applications
# (such as React running on another port)
# can communicate with this backend service
from flask_cors import CORS

# Import custom emotion analysis function
# from emotionAnalyzer.py
from emotionAnalyzer import analyze_emotion

# Create Flask application instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
# This allows requests from frontend apps
CORS(app)

# ---------------------------------------------
# HEALTH CHECK ROUTE
# ---------------------------------------------
# Simple route used to verify the service is running
#
# Endpoint:
# GET /health
#
# Example response:
# {
#   "status": "ML service running"
# }
@app.route("/health", methods=["GET"])
def health():

    # Return JSON response with HTTP status 200 (success)
    return jsonify({
        "status": "ML service running"
    }), 200


# ---------------------------------------------
# EMOTION ANALYSIS ROUTE
# ---------------------------------------------
# This route accepts user journal text
# and returns a detected emotion
#
# Endpoint:
# POST /analyze
#
# Example request body:
# {
#   "text": "I feel overwhelmed and nervous today"
# }
#
# Example response:
# {
#   "emotion": "anxiety"
# }
@app.route("/analyze", methods=["POST"])
def analyze():

    # Use try/except to safely catch server errors
    try:

        # Get JSON data sent from frontend/client
        data = request.get_json()

        # Validate request body
        # Ensure data exists and contains "text"
        if not data or "text" not in data:

            # Return error message with HTTP 400 (bad request)
            return jsonify({
                "message": "Text is required"
            }), 400

        # Extract text from request body
        # Default to empty string if missing
        text = data.get("text", "")

        # Run emotion analysis function
        emotion = analyze_emotion(text)

        # Return detected emotion as JSON response
        return jsonify({
            "emotion": emotion
        }), 200

    # Handle unexpected server errors
    except Exception as error:

        # Return error details with HTTP 500
        return jsonify({
            "message": "Emotion analysis failed",
            "error": str(error)
        }), 500


# ---------------------------------------------
# APPLICATION ENTRY POINT
# ---------------------------------------------
# This block runs only when the file is executed directly
#
# Starts Flask development server on port 8000
# debug=True enables automatic reload and detailed errors
if __name__ == "__main__":

    # Start Flask server
    app.run(port=8000, debug=True)