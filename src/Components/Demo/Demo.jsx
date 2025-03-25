"use client"

import { useState, useRef, useEffect } from "react"
import { angry, disgust, fear, happy, neutral, sad, surprised } from "@/assets/emotions"
import { mainURL } from "@/constants"
import axios from "axios"
import ErrorPopup from "@/utils/ErrorPopup"
import { motion } from "framer-motion"
import { Upload, Camera, AlertCircle, ImageIcon } from "lucide-react"

export default function Demo({ ref }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [currentEmotion, setCurrentEmotion] = useState("")
  const [value, setValue] = useState(0)
  const [errorPopup, setErrorPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [results, setResults] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState("upload") // "upload" or "webcam"
  const [stream, setStream] = useState(null)
  const [isCameraReady, setCameraReady] = useState(false)

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Initialize or cleanup webcam
  useEffect(() => {
    if (mode === "webcam") {
      initializeWebcam()
    } else {
      // Cleanup webcam when switching away from webcam mode
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
        setCameraReady(false)
      }
    }

    return () => {
      // Cleanup on component unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [mode])

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
      setErrorPopup(true)
      setMessage("Unable to access camera. Please check permissions and try again.")
      setMode("upload")
    }
  }

  const captureImage = () => {
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
      (blob) => {
        const capturedFile = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })
        setFile(capturedFile)
        setPreview(URL.createObjectURL(blob))
      },
      "image/jpeg",
      0.95,
    )
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const emotions = {
    happy: { image: happy, color: "pink-500", label: "Happiness", },
    neutral: { image: neutral, color: "purple-500", label: "Calmness", },
    surprised: { image: surprised, color: "blue-500", label: "Alertness",  },
    sad: { image: sad, color: "blue-400", label: "Sadness", },
    fear: { image: fear, color: "indigo-400", label: "Fear", },
    angry: { image: angry, color: "red-500", label: "Anger", },
    disgust: { image: disgust, color: "green-500", label: "Disgust", },
  }

  const getEmotionDescription = (emotion) => {
    const descriptions = {
      happy: "Baby appears to be in a positive mood with high alertness levels. Perfect time for play.",
      neutral: "Baby is calm and relaxed. Gentle activities or reading time would be appropriate.",
      surprised: "Baby is highly alert and attentive. Introduce new toys or cognitive activities.",
      sad: "Baby appears to be unhappy. Comforting and soothing activities recommended.",
      fear: "Baby appears to be afraid or anxious. Provide reassurance in a calm environment.",
      angry: "Baby appears frustrated or upset. Identify and address the source of frustration.",
      disgust: "Baby reacts negatively to something. Remove the stimulus and provide distraction.",
    }
    return descriptions[emotion] || "Analysis not available."
  }

  const handleDetection = async () => {
    if (!file) return

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("image", file)

      const response = await axios.post(`${mainURL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setResults(response.data.results)
      setCurrentEmotion(response.data.results[0]?.emotion || "")
      setValue(response.data.results[0]?.probability || 0)
      setIsLoading(false)
      setPreview(null)
      setFile(null)
    } catch (error) {
      setErrorPopup(true)
      setMessage(error.response?.data.error || "An error occurred. Please try again.")
      setIsLoading(false)
      setPreview(null)
      setFile(null)
    }
  }

  return (
    <section ref={ref} id="demo" className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Try Our Demo
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Experience real-time emotion detection with our advanced AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-neutral-800">Capture Image</h3>

              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button
                  onClick={() => setMode("upload")}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                    mode === "upload" ? "bg-white text-pink-500 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Upload
                </button>
                <button
                  onClick={() => setMode("webcam")}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                    mode === "webcam" ? "bg-white text-pink-500 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  Webcam
                </button>
              </div>
            </div>

            {mode === "upload" ? (
              <div
                className={`relative border-2 ${isDragging ? "border-pink-400 bg-pink-50" : "border-dashed border-neutral-200"} 
                  rounded-2xl p-10 text-center transition-all duration-200 hover:border-pink-300 hover:bg-neutral-50`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

                {preview ? (
                  <div className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="mx-auto w-48 h-48 object-cover rounded-xl shadow-md"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreview(null)
                        setFile(null)
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-pink-50 mb-4">
                      <Upload className="w-8 h-8 text-pink-500" />
                    </div>
                    <p className="text-neutral-600 mb-2">Drag and drop your image here</p>
                    <p className="text-neutral-400 text-sm">or click to browse</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-neutral-900 relative">
                {!isCameraReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-75 z-10">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
                      <p>Initializing camera...</p>
                    </div>
                  </div>
                )}

                <video ref={videoRef} autoPlay playsInline muted className="w-full aspect-video object-cover" />

                <canvas ref={canvasRef} className="hidden" />

                {preview ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-90">
                    <div className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Captured"
                        className="max-h-64 rounded-lg shadow-lg"
                      />
                      <button
                        onClick={() => setPreview(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button
                      onClick={captureImage}
                      disabled={!isCameraReady}
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-white"></div>
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className={`w-full mt-8 font-medium px-6 py-4 rounded-xl shadow-md transition-all duration-200
                ${
                  file
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:from-pink-600 hover:to-purple-700"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              onClick={handleDetection}
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Analyze Emotion"
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100"
          >
            <h3 className="text-2xl font-semibold mb-6 text-neutral-800">Emotion Analysis</h3>

            {currentEmotion ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-32 h-32 rounded-full bg-${emotions[currentEmotion]?.color}/10 flex items-center justify-center mb-6`}
                >
                  <img
                    src={emotions[currentEmotion]?.image.src || "/placeholder.svg"}
                    alt={currentEmotion}
                    className="w-24 h-24"
                  />
                </div>

                <h4 className={`text-xl font-bold text-${emotions[currentEmotion]?.color} mb-2`}>
                  {emotions[currentEmotion]?.label}
                </h4>

                <div className="w-full bg-neutral-100 rounded-full h-2.5 mb-6">
                  <div
                    className={`bg-${emotions[currentEmotion]?.color} h-2.5 rounded-full`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <p className="text-neutral-700">{getEmotionDescription(currentEmotion)}</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-neutral-400">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-neutral-400" />
                </div>
                <p>No analysis available yet</p>
                <p className="text-sm mt-2">Upload or capture an image to see results</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {errorPopup && <ErrorPopup onClose={() => setErrorPopup(false)} message={message} />}
    </section>
  )
}

