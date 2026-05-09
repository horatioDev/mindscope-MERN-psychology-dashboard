# Function to analyze emotional tone from journal text
def analyze_emotion(text):

    # Check if the input is empty or only contains spaces
    # If so, return a default emotion of "neutral"
    if not text or not text.strip():
        return "neutral"

    # Convert all text to lowercase so matching is case-insensitive
    text = text.lower()

    # List of keywords associated with anxiety
    anxiety_words = [
        "anxious", "anxiety", "nervous", "worried", "panic",
        "overwhelmed", "fear", "scared", "uneasy"
    ]

    # List of keywords associated with stress
    stress_words = [
        "stressed", "stress", "pressure", "burned out", "burnout",
        "exhausted", "tired", "drained", "frustrated"
    ]

    # List of keywords associated with sadness
    sadness_words = [
        "sad", "depressed", "lonely", "hurt", "cry", "hopeless",
        "down", "empty", "grief"
    ]

    # List of keywords associated with anger
    anger_words = [
        "angry", "mad", "furious", "irritated", "annoyed",
        "rage", "resentful"
    ]

    # List of keywords associated with positive emotions
    positive_words = [
        "happy", "good", "great", "excited", "grateful",
        "motivated", "proud", "peaceful", "calm", "hopeful"
    ]

    # Check if any anxiety-related word exists in the text
    # If found, return "anxiety"
    if any(word in text for word in anxiety_words):
        return "anxiety"

    # Check for stress-related words
    if any(word in text for word in stress_words):
        return "stress"

    # Check for sadness-related words
    if any(word in text for word in sadness_words):
        return "sadness"

    # Check for anger-related words
    if any(word in text for word in anger_words):
        return "anger"

    # Check for positive emotion words
    if any(word in text for word in positive_words):
        return "positive"

    # If no emotional keywords are found,
    # return a default value of "neutral"
    return "neutral"