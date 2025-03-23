"use client"

import { useState, useEffect } from "react"
import { angry, disgust, fear, happy, neutral, sad, surprised } from "@/assets/emotions";
import { mainURL } from "@/constants";
import axios from "axios";

export default function Demo({ ref }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState("happy"); // Default emotion

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  // Emotion data with corresponding image and color
  const emotions = {
    happy: { image: happy, color: "pink-500", label: "Happiness", value: 75 },
    neutral: { image: neutral, color: "purple-500", label: "Calmness", value: 80 },
    surprised: { image: surprised, color: "blue-500", label: "Alertness", value: 85 },
    sad: { image: sad, color: "blue-400", label: "Sadness", value: 70 },
    fear: { image: fear, color: "indigo-400", label: "Fear", value: 60 },
    angry: { image: angry, color: "red-500", label: "Anger", value: 55 },
    disgust: { image: disgust, color: "green-500", label: "Disgust", value: 45 }
  };

  // Cycle through emotions for demo purposes
  useEffect(() => {
    const emotionKeys = Object.keys(emotions);
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emotionKeys.length;
      setCurrentEmotion(emotionKeys[currentIndex]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Get descriptions for each emotion
  const getEmotionDescription = (emotion) => {
    const descriptions = {
      happy: "Baby appears to be in a positive mood with high alertness levels. Recommended action: Perfect time for interactive play or learning activities.",
      neutral: "Baby is calm and relaxed. Recommended action: Gentle activities or reading time would be appropriate.",
      surprised: "Baby is highly alert and attentive. Recommended action: Introduce new toys or cognitive development activities.",
      sad: "Baby appears to be unhappy. Recommended action: Comforting and soothing activities recommended.",
      fear: "Baby appears to be afraid or anxious. Recommended action: Provide comfort and reassurance in a calm environment.",
      angry: "Baby appears to be frustrated or upset. Recommended action: Identify and address the source of frustration, offer comfort.",
      disgust: "Baby appears to be reacting negatively to something. Recommended action: Remove aversive stimulus and provide distraction."
    };
    
    return descriptions[emotion] || "Analysis not available.";
  };
  
  const handleDetection = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file); // Use file instead of preview

      const response = await axios.post(`${mainURL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Prediction Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
      throw error;
    }
  };
  

  return (
    <section ref={ref} id="demo" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Try Our Demo</h2>
          <p className="text-lg text-neutral-600">Experience real-time emotion detection in action</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Demo Interface */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-black">Upload Image or Video</h3>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="text-4xl mb-4">📷</div>
                  <p className="text-neutral-600 mb-2">Drag and drop or click to upload</p>
                  <span className="text-sm text-neutral-500">Supported formats: JPG, PNG, MP4</span>
                </label>
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto w-32 h-32 object-cover rounded-lg shadow"
                    />
                  </div>
                )}

                <div className="mt-4 text-neutral-600">
                  {file && file.name}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg transform transition hover:scale-105" 
                onClick={handleDetection}
              >
                Start Detection
              </button>
            </div>

            <div id="webcamOption" className="text-center">
              <button className="text-purple-600 hover:text-purple-700 font-medium">Or Try with Webcam →</button>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-semibold mb-6 text-black">Emotion Analysis</h3>

            <div className="mb-8">
              <div className="flex justify-center items-end h-48 bg-neutral-50 rounded-lg mb-6">
                <div
                  className="w-100 h-[90%] transition-all duration-500 transform"
                  style={{ animation: `pulse-${emotions[currentEmotion].color} 2s infinite` }}
                >
                  <div className="animate__animated animate__fadeIn animate__faster h-full">
                    <img 
                      src={emotions[currentEmotion].image.src} 
                      alt={`${currentEmotion} emotion`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {Object.keys(emotions).map(emotion => (
                  <div key={emotion} className={`transition-opacity duration-500 ${currentEmotion === emotion ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-700">{emotions[emotion].label}</span>
                      <span className={`text-${emotions[emotion].color} ${currentEmotion === emotion ? 'font-bold' : ''}`}>
                        {emotions[emotion].value}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div
                        className={`bg-${emotions[emotion].color} h-2 rounded-full transition-all duration-1000`}
                        style={{ 
                          width: `${currentEmotion === emotion ? emotions[emotion].value : 20}%`,
                          opacity: currentEmotion === emotion ? 1 : 0.5
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-neutral-700 text-sm animate__animated animate__fadeIn">
                <span className="font-semibold">Analysis:</span> {getEmotionDescription(currentEmotion)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations for the pulsing effect */}
      <style jsx>{`
        @keyframes pulse-pink-500 {
          0% { filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(236, 72, 153, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.1)); }
        }
        
        @keyframes pulse-purple-500 {
          0% { filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.1)); }
        }
        
        @keyframes pulse-blue-500 {
          0% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
        }
        
        @keyframes pulse-blue-400 {
          0% { filter: drop-shadow(0 0 5px rgba(96, 165, 250, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(96, 165, 250, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(96, 165, 250, 0.1)); }
        }
        
        @keyframes pulse-indigo-400 {
          0% { filter: drop-shadow(0 0 5px rgba(129, 140, 248, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(129, 140, 248, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(129, 140, 248, 0.1)); }
        }
        
        @keyframes pulse-red-500 {
          0% { filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.1)); }
        }
        
        @keyframes pulse-green-500 {
          0% { filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.1)); }
          50% { filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.5)); }
          100% { filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.1)); }
        }
      `}</style>
    </section>
  )
}