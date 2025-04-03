"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { mainURL } from "@/constants";

export default function Visualization({ ref }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isLiveDetection, setIsLiveDetection] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emotion, setEmotion] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const videoRef = useRef(null);
  const liveVideoRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      if (!isLiveDetection) {
        initializeWebcam();
      }
    } else {
      stopWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isRecording, isLiveDetection]);

  useEffect(() => {
    if (emotion) {
      fetchSuggestion(emotion);
    }
  }, [emotion]);

  const initializeWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setErrorMessage("Unable to access camera. Please check permissions and try again.");
      setIsRecording(false);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const fetchSuggestion = async (emotion) => {
    try {
      const response = await axios.get(`${mainURL}/get_suggestion/${emotion}`);
      if (response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation("Unable to fetch recommendations at this time.");
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    setErrorMessage("");
  };

  useEffect(() => {
    if (isRecording) {
      setIsLiveDetection(true);
      if (liveVideoRef.current) {
        liveVideoRef.current.src = `${mainURL}/predict_video`;
      }
      // Start polling for emotion updates
      const emotionInterval = setInterval(async () => {
        try {
          const response = await axios.get(`${mainURL}/get_current_emotion`);
          if (response.data && response.data.emotion) {
            setEmotion(response.data.emotion);
          }
        } catch (error) {
          console.error("Error fetching current emotion:", error);
        }
      }, 1000); // Poll every second

      return () => clearInterval(emotionInterval);
    } else {
      setIsLiveDetection(false);
      if (liveVideoRef.current) {
        liveVideoRef.current.src = "";
      }
      setEmotion(""); // Reset emotion when stopping
    }
  }, [isRecording]);
  

  useEffect(() => {
    if (!isRecording) return; // Run only when isRecording is true
  
    const interval = setInterval(async () => {
      try {
        if (emotion) {  // Only make the API call if we have an emotion
          const response = await axios.get(`${mainURL}/get_suggestion/${emotion}`);
          if (response.data && response.data.recommendation) {
            setRecommendation(response.data.recommendation);
          }
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        setRecommendation("Unable to fetch recommendations at this time.");
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [emotion, isRecording]);  // Added isRecording as a dependency
  


  return (
    <section ref={ref} className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Live Emotion Analysis of your Child
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Real-time AI analysis of your baby's emotional state
          </p>

          <button
            onClick={toggleRecording}
            className={`bg-gradient-to-r ${isRecording ? "from-red-500 to-pink-600" : "from-pink-400 to-purple-500"
              } text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105`}
          >
            {isRecording ? "Stop Analysis" : "Start Analysis"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <h3 className="text-xl font-semibold mb-4 text-black">Live Feed</h3>
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              {isLiveDetection ? (
                <img ref={liveVideoRef} src={`${mainURL}/predict_video`} alt="Live feed" className="w-full h-full object-cover" />
              ) : (
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline muted />
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn">
            <h3 className="text-2xl font-semibold mb-6 text-black">AI Powered Suggestions</h3>
            <div className="p-6 bg-pink-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-black mb-2">
                  {emotion ? `Baby is feeling ${emotion}` : "Start analysis to get suggestions"}
                </div>
                <div className="text-lg text-neutral-700">
                  {recommendation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
