def analyze_emotion(text):
    # Check if there is a Journal entry analyze
    if not text or not text.strip():
        return "neutral"

    # Transform text
    text = text.lower()

    # List of anxiety words 
    anxiety_words = [
        "anxious", "anxiety", "nervous", "worried", "panic",
        "overwhelmed", "fear", "scared", "uneasy"
    ]

    # List of stress words 
    stress_words = [
        "stressed", "stress", "pressure", "burned out", "burnout",
        "exhausted", "tired", "drained", "frustrated"
    ]

    # List of sad words 
    sadness_words = [
        "sad", "depressed", "lonely", "hurt", "cry", "hopeless",
        "down", "empty", "grief"
    ]

    # List of anger words 
    anger_words = [
        "angry", "mad", "furious", "irritated", "annoyed",
        "rage", "resentful"
    ]

    # List of positive words 
    positive_words = [
        "happy", "good", "great", "excited", "grateful",
        "motivated", "proud", "peaceful", "calm", "hopeful"
    ]

    # Check if word is in list of anxiety words 
    if any(word in text for word in anxiety_words):
        return "anxiety"

    # Check if word is in list of stress words 
    if any(word in text for word in stress_words):
        return "stress"

    # Check if word is in list of sad words 
    if any(word in text for word in sadness_words):
        return "sadness"

    # Check if word is in list of anger words 
    if any(word in text for word in anger_words):
        return "anger"

    # Check if word is in list of positive words 
    if any(word in text for word in positive_words):
        return "positive"

    return "neutral"