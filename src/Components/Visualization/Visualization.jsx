"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { mainURL } from "@/constants"
import { Maximize2, Minimize2, Play, Square } from "lucide-react"

export default function Visualization({ ref }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isLiveDetection, setIsLiveDetection] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [emotion, setEmotion] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const videoRef = useRef(null)
  const liveVideoRef = useRef(null)
  const videoContainerRef = useRef(null)

  useEffect(() => {
    if (isRecording) {
      if (!isLiveDetection) {
        initializeWebcam()
      }
    } else {
      stopWebcam()
    }

    return () => {
      stopWebcam()
    }
  }, [isRecording, isLiveDetection])

  useEffect(() => {
    if (emotion) {
      fetchSuggestion(emotion)
    }
  }, [emotion])

  const initializeWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setErrorMessage("Unable to access camera. Please check permissions and try again.")
      setIsRecording(false)
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
  }

  const fetchSuggestion = async (emotion) => {
    try {
      const response = await axios.get(`${mainURL}/get_suggestion/${emotion}`)
      if (response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation)
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error)
      setRecommendation("Unable to fetch recommendations at this time.")
    }
  }

  const toggleRecording = () => {
    setIsRecording((prev) => !prev)
    setErrorMessage("")
  }

  useEffect(() => {
    if (isRecording) {
      setIsLiveDetection(true)
      if (liveVideoRef.current) {
        liveVideoRef.current.src = `${mainURL}/predict_video`
      }
      // Start polling for emotion updates
      const emotionInterval = setInterval(async () => {
        try {
          const response = await axios.get(`${mainURL}/get_current_emotion`)
          if (response.data && response.data.emotion) {
            setEmotion(response.data.emotion)
          }
        } catch (error) {
          console.error("Error fetching current emotion:", error)
        }
      }, 1000) // Poll every second

      return () => clearInterval(emotionInterval)
    } else {
      setIsLiveDetection(false)
      if (liveVideoRef.current) {
        liveVideoRef.current.src = ""
      }
      setEmotion("") // Reset emotion when stopping
    }
  }, [isRecording])

  useEffect(() => {
    if (!isRecording) return // Run only when isRecording is true

    const interval = setInterval(async () => {
      try {
        if (emotion) {
          // Only make the API call if we have an emotion
          const response = await axios.get(`${mainURL}/get_suggestion/${emotion}`)
          if (response.data && response.data.recommendation) {
            setRecommendation(response.data.recommendation)
          }
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error)
        setRecommendation("Unable to fetch recommendations at this time.")
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [emotion, isRecording])

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
    setIsSmallScreen(false)
  }

  const toggleSmallScreen = () => {
    setIsSmallScreen((prev) => !prev)
    setIsFullScreen(false)
  }

  // Handle ESC key to exit full screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullScreen])

  return (
    <section ref={ref} className="py-20 bg-neutral-100 min-h-screen">
      {isFullScreen ? (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleFullScreen}
              className="text-white bg-neutral-800 p-2 rounded-full hover:bg-neutral-700 transition-colors"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {isLiveDetection ? (
              <img
                ref={liveVideoRef}
                src={`${mainURL}/predict_video`}
                alt="Live feed"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <video ref={videoRef} className="max-h-full max-w-full object-contain" autoPlay playsInline muted />
            )}
          </div>
          <div className="bg-neutral-900 p-4 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">Current Analysis</h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-medium">
                  {emotion ? `Baby is feeling ${emotion}` : "Waiting for analysis..."}
                </div>
                <div className="flex-1 text-neutral-300">{recommendation}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Live Emotion Analysis of your Child</h2>
            <p className="text-lg text-neutral-600 mb-6">Real-time AI analysis of your baby's emotional state</p>

            <button
              onClick={toggleRecording}
              className={`bg-gradient-to-r ${
                isRecording ? "from-red-500 to-pink-600" : "from-pink-400 to-purple-500"
              } text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105`}
            >
              {isRecording ? (
                <span className="flex items-center">
                  <Square className="w-5 h-5 mr-2" /> Stop Analysis
                </span>
              ) : (
                <span className="flex items-center">
                  <Play className="w-5 h-5 mr-2" /> Start Analysis
                </span>
              )}
            </button>
          </div>

          <div className={`grid ${isSmallScreen ? "md:grid-cols-[1fr_3fr]" : "md:grid-cols-2"} gap-8`}>
            <div
              ref={videoContainerRef}
              className={`bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInLeft ${
                isSmallScreen ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-black">Live Feed</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                    title="Full screen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                {isLiveDetection ? (
                  <img
                    ref={liveVideoRef}
                    src={`${mainURL}/predict_video`}
                    alt="Live feed"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                )}
                {errorMessage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white p-4 text-center">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn ${
                isSmallScreen ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-6 text-black">AI Powered Suggestions</h3>
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg shadow-inner h-[80%]">
                <div className="text-center">
                  <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm mb-4">
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      {emotion ? `Baby is feeling ${emotion}` : "Start analysis to get suggestions"}
                    </span>
                  </div>
                  <div className="text-lg text-neutral-700 bg-white/70 p-4 rounded-lg">
                    {recommendation || "Suggestions will appear here once analysis begins"}
                  </div>
                </div>
              </div>

              {isRecording && (
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h4 className="font-medium text-neutral-800 mb-2">Tips:</h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Ensure good lighting for better detection</li>
                    <li>• Position your baby's face clearly in the frame</li>
                    <li>• Try different angles if detection is inconsistent</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

