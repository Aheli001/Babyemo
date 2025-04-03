def get_gemini_recommendation(emotion):
    """Fetches AI-based recommendations based on emotion using Gemini API."""
    prompt = f"My baby is feeling {emotion}. Give me ONE specific action or activity (max 25 words) that parents should do with the baby to help them."
    
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        
        if response and hasattr(response, 'text'):
            # Clean up the response to ensure it's concise
            recommendation = response.text.strip()
            # If the response is too long, take the first sentence
            recommendation = recommendation.split('.')[0] + '.'
            return recommendation
        return "Try gentle rocking and soft singing to soothe the baby."
    except Exception as e:
        print(f"Error fetching Gemini API response: {str(e)}")
        return "Try gentle rocking and soft singing to soothe the baby." 