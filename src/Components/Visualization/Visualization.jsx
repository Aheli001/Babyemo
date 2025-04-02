"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { mainURL } from "@/constants"
import { motion } from "framer-motion"
import { Activity } from "lucide-react"

// Simulated AI emotion recognition service
// In a real implementation, you would import an actual AI client library
const emotionRecognitionService = {
  async analyzeFrame(imageData) {
    // This would be replaced with actual API call to an emotion recognition service
    // Simulating API response with random data for demonstration
    return {
      happy: Math.floor(60 + Math.random() * 30),
      calm: Math.floor(60 + Math.random() * 30),
      active: Math.floor(60 + Math.random() * 30),
      faceData: {
        // Simulated face landmarks/heatmap data
        eyes: {
          left: { x: 0.25, y: 0.33, intensity: Math.random() },
          right: { x: 0.75, y: 0.33, intensity: Math.random() },
        },
        mouth: { x: 0.5, y: 0.75, width: 0.33, intensity: Math.random() },
      },
    }
  },
}

// Helper function to generate suggestions based on emotional state
const generateSuggestions = (happy, calm, active) => {
  const suggestions = []

  // Happiness-based suggestions
  if (happy < 50) {
    suggestions.push("Try playing peek-a-boo or making funny faces to boost happiness")
    suggestions.push("Play their favorite music or sing a cheerful song")
  } else if (happy > 80) {
    suggestions.push("Great job! Your baby is very happy. Continue what you're doing")
    suggestions.push("Take photos or videos to capture this joyful moment")
  }

  // Calmness-based suggestions
  if (calm < 50) {
    suggestions.push("Try gentle rocking or swaying to soothe your baby")
    suggestions.push("Speak in a soft, gentle voice and reduce environmental stimuli")
    suggestions.push("Consider dimming the lights and playing white noise or lullabies")
  } else if (calm > 80) {
    suggestions.push("Your baby is very relaxed. This might be a good time for a nap")
    suggestions.push("Maintain the peaceful environment you've created")
  }

  // Activity-based suggestions
  if (active < 50) {
    suggestions.push("Try introducing colorful toys or making interesting sounds to engage them")
    suggestions.push("Gentle tickling or interactive play might increase engagement")
  } else if (active > 80) {
    suggestions.push("Your baby is very active. Provide safe space for movement and exploration")
    suggestions.push("If it's close to nap time, consider calming activities to wind down")
  }

  // Combined state suggestions
  if (happy > 70 && calm > 70) {
    suggestions.push("Perfect balance of happiness and calmness. Ideal for learning activities")
  }

  if (happy < 50 && calm < 50) {
    suggestions.push("Your baby might be uncomfortable or hungry. Check basic needs")
    suggestions.push("Try a change of environment or activity")
  }

  // Return 2-3 random suggestions to avoid overwhelming the parent
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
}

export default function Visualization({ ref }) {
  const [isRecording, setIsRecording] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState("")
  const [emotionProbability, setEmotionProbability] = useState(0)
  const [stream, setStream] = useState(null)
  const [isCameraReady, setCameraReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const heatmapRef = useRef(null)

  const [emotionData, setEmotionData] = useState({
    happy: [],
    calm: [],
    active: [],
  })
  const [currentTime, setCurrentTime] = useState(null)
  const [faceData, setFaceData] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
  }, [])

  // Initialize webcam when recording starts
  useEffect(() => {
    if (isRecording) {
      initializeWebcam()
    } else {
      // Cleanup webcam when stopping recording
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
        setCameraReady(false)
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isRecording])

  const initializeWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true)
        }
      }
    } catch (err) {
      setErrorMessage("Unable to access camera. Please check permissions and try again.")
      setIsRecording(false)
    }
  }

  // Process video frames when camera is ready
  useEffect(() => {
    let processingInterval

    if (isCameraReady && isRecording) {
      processingInterval = setInterval(processVideoFrame, 1000) // Process every second
    }

    return () => {
      if (processingInterval) {
        clearInterval(processingInterval)
      }
    }
  }, [isCameraReady, isRecording])

  const processVideoFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the video frame to the canvas
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob
    canvas.toBlob(
      async (blob) => {
        try {
          const formData = new FormData()
          formData.append("image", blob)

          const response = await axios.post(`${mainURL}/predict`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })

          setCurrentEmotion(response.data.results[0]?.emotion || "")
          setEmotionProbability(response.data.results[0]?.probability || 0)
        } catch (error) {
          setErrorMessage(error.response?.data.error || "An error occurred during analysis.")
          setIsRecording(false)
        }
      },
      "image/jpeg",
      0.95
    )
  }

  const toggleRecording = () => {
    setIsRecording(prev => !prev)
    setErrorMessage("")
  }

  // Get the latest emotion values
  const latestEmotions = {
    happy: emotionData.happy.length > 0 ? emotionData.happy[emotionData.happy.length - 1] : 0,
    calm: emotionData.calm.length > 0 ? emotionData.calm[emotionData.calm.length - 1] : 0,
    active: emotionData.active.length > 0 ? emotionData.active[emotionData.active.length - 1] : 0,
  }

  return (
    <section ref={ref} className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Live Emotion Analysis of your Child</h2>
          <p className="text-lg text-neutral-600 mb-6">Real-time AI analysis of your baby's emotional state</p>

          <button
            onClick={toggleRecording}
            className={`bg-gradient-to-r ${
              isRecording
                ? "from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                : "from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
            } text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105 animate__animated animate__pulse animate__infinite`}
          >
            {isRecording ? "Stop Analysis" : "Start Analysis"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Feed */}
          <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <h3 className="text-xl font-semibold mb-4 text-black">Live Feed</h3>
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover" 
                autoPlay 
                playsInline 
                muted 
              />
              <canvas ref={canvasRef} className="hidden" />

              {!isRecording && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-sm bg-black bg-opacity-50 p-2 rounded">
                    Click "Start Analysis" to begin
                  </p>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="mt-4">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Status: {isRecording ? "Analyzing..." : "Ready"}</span>
                <span>{currentTime ?? ""}</span>
              </div>
            </div>
          </div>

          {/* Emotion Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-black">Current Emotion</h3>
            {isRecording ? (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-purple-600">
                  {currentEmotion ? currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1) : 'Analyzing...'}
                </div>
                {currentEmotion && (
                  <div className="w-full bg-neutral-100 rounded-full h-2.5">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${emotionProbability}%` }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-neutral-500">
                Start analysis to see real-time emotion detection
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mt-5 bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn">
          <h3 className="text-2xl font-semibold mb-6 text-black">Personalized Suggestions</h3>

          {isRecording && suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-pink-100 animate__animated animate__fadeIn"
                >
                  <p className="text-neutral-700">{suggestion}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-neutral-50 rounded-lg text-center">
              <p className="text-neutral-500">
                {isRecording
                  ? "Analyzing your baby's emotions to generate personalized suggestions..."
                  : "Start the analysis to receive personalized suggestions based on your baby's emotional state."}
              </p>
            </div>
          )}
        </div>

        {/* Emotional Insights Section */}
        <div className="mt-5 bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn">
          <h3 className="text-2xl font-semibold mb-6 text-black">Emotional Insights</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <h4 className="font-medium text-pink-700 mb-2">Happiness Analysis</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${latestEmotions.happy}%` }}
                ></div>
              </div>
              <p className="text-neutral-700 text-sm">
                {emotionData.happy.length > 0
                  ? `Current happiness level: ${latestEmotions.happy}%. ${latestEmotions.happy > 70
                    ? "Your baby appears very happy!"
                    : latestEmotions.happy > 50
                      ? "Your baby seems content."
                      : "Your baby may need some attention."
                  }`
                  : "Start analysis to see happiness insights."}
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-700 mb-2">Calmness Analysis</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${latestEmotions.calm}%` }}
                ></div>
              </div>
              <p className="text-neutral-700 text-sm">
                {emotionData.calm.length > 0
                  ? `Current calmness level: ${latestEmotions.calm}%. ${latestEmotions.calm > 70
                    ? "Your baby is very relaxed."
                    : latestEmotions.calm > 50
                      ? "Your baby is moderately calm."
                      : "Your baby may be experiencing some stress."
                  }`
                  : "Start analysis to see calmness insights."}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Activity Analysis</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${latestEmotions.active}%` }}
                ></div>
              </div>
              <p className="text-neutral-700 text-sm">
                {emotionData.active.length > 0
                  ? `Current activity level: ${latestEmotions.active}%. ${latestEmotions.active > 70
                    ? "Your baby is very active and engaged."
                    : latestEmotions.active > 50
                      ? "Your baby shows moderate activity."
                      : "Your baby appears relatively inactive right now."
                  }`
                  : "Start analysis to see activity insights."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

