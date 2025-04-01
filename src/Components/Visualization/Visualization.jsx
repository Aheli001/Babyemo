"use client"

import { useState, useEffect, useRef } from "react"
import Chart from "chart.js/auto"

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
          right: { x: 0.75, y: 0.33, intensity: Math.random() }
        },
        mouth: { x: 0.5, y: 0.75, width: 0.33, intensity: Math.random() }
      }
    }
  }
}

export default function DynamicVisualization({ ref }) {
  const chartRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const heatmapRef = useRef(null)
  const chartInstance = useRef(null)
  
  const [isRecording, setIsRecording] = useState(false)
  const [emotionData, setEmotionData] = useState({
    happy: [],
    calm: [],
    active: []
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [faceData, setFaceData] = useState(null)

  // Initialize the chart
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        // Create time labels for the last 6 data points
        const labels = Array(6).fill().map((_, i) => {
          const d = new Date()
          d.setMinutes(d.getMinutes() - (5-i))
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Happy",
                data: Array(6).fill(null),
                borderColor: "rgb(244, 114, 182)",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Calm",
                data: Array(6).fill(null),
                borderColor: "rgb(167, 139, 250)",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Active",
                data: Array(6).fill(null),
                borderColor: "rgb(96, 165, 250)",
                tension: 0.4,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value) => value + "%",
                },
              },
            },
          },
        })
      }
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [])

  // Set up video streaming and AI processing
  useEffect(() => {
    let animationFrame
    let processingInterval
    
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        
        // Set up processing interval to analyze frames
        processingInterval = setInterval(processVideoFrame, 2000) // Process every 2 seconds
        
        return stream
      } catch (err) {
        console.error('Error accessing camera:', err)
      }
    }
    
    const processVideoFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !isRecording) return
      
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Get image data from canvas
      const imageData = canvas.toDataURL('image/jpeg')
      
      // Send to AI service for analysis
      const result = await emotionRecognitionService.analyzeFrame(imageData)
      
      // Update emotion data state with new readings
      setEmotionData(prev => ({
        happy: [...prev.happy.slice(-5), result.happy],
        calm: [...prev.calm.slice(-5), result.calm],
        active: [...prev.active.slice(-5), result.active]
      }))
      
      // Update face heatmap data
      setFaceData(result.faceData)
      
      // Update current time
      setCurrentTime(new Date())
    }
    
    const updateChart = () => {
      if (chartInstance.current && emotionData.happy.length > 0) {
        // Update time labels
        const labels = Array(6).fill().map((_, i) => {
          const d = new Date(currentTime)
          d.setMinutes(d.getMinutes() - (5-i))
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        
        chartInstance.current.data.labels = labels
        
        // Update emotion data
        chartInstance.current.data.datasets[0].data = emotionData.happy.length < 6 
          ? [...Array(6 - emotionData.happy.length).fill(null), ...emotionData.happy]
          : emotionData.happy
          
        chartInstance.current.data.datasets[1].data = emotionData.calm.length < 6
          ? [...Array(6 - emotionData.calm.length).fill(null), ...emotionData.calm]
          : emotionData.calm
          
        chartInstance.current.data.datasets[2].data = emotionData.active.length < 6
          ? [...Array(6 - emotionData.active.length).fill(null), ...emotionData.active]
          : emotionData.active
          
        chartInstance.current.update()
      }
      
      // Update heatmap visualization
      updateHeatmap()
      
      animationFrame = requestAnimationFrame(updateChart)
    }
    
    const updateHeatmap = () => {
      if (!heatmapRef.current || !faceData) return
      
      const canvas = heatmapRef.current
      const ctx = canvas.getContext('2d')
      
      // Clear previous drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw face outline
      ctx.beginPath()
      ctx.arc(canvas.width/2, canvas.height/2, canvas.width/4, 0, Math.PI * 2)
      ctx.strokeStyle = '#d1d5db'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw eyes with intensity
      const leftEyeIntensity = faceData.eyes.left.intensity
      const rightEyeIntensity = faceData.eyes.right.intensity
      const mouthIntensity = faceData.mouth.intensity
      
      // Left eye
      const leftEyeGradient = ctx.createRadialGradient(
        canvas.width * faceData.eyes.left.x, 
        canvas.height * faceData.eyes.left.y,
        0,
        canvas.width * faceData.eyes.left.x, 
        canvas.height * faceData.eyes.left.y,
        canvas.width * 0.08
      )
      leftEyeGradient.addColorStop(0, `rgba(244, 114, 182, ${leftEyeIntensity})`)
      leftEyeGradient.addColorStop(1, 'rgba(244, 114, 182, 0)')
      
      ctx.beginPath()
      ctx.arc(
        canvas.width * faceData.eyes.left.x, 
        canvas.height * faceData.eyes.left.y, 
        canvas.width * 0.08, 
        0, 
        Math.PI * 2
      )
      ctx.fillStyle = leftEyeGradient
      ctx.fill()
      
      // Right eye
      const rightEyeGradient = ctx.createRadialGradient(
        canvas.width * faceData.eyes.right.x, 
        canvas.height * faceData.eyes.right.y,
        0,
        canvas.width * faceData.eyes.right.x, 
        canvas.height * faceData.eyes.right.y,
        canvas.width * 0.08
      )
      rightEyeGradient.addColorStop(0, `rgba(244, 114, 182, ${rightEyeIntensity})`)
      rightEyeGradient.addColorStop(1, 'rgba(244, 114, 182, 0)')
      
      ctx.beginPath()
      ctx.arc(
        canvas.width * faceData.eyes.right.x, 
        canvas.height * faceData.eyes.right.y, 
        canvas.width * 0.08, 
        0, 
        Math.PI * 2
      )
      ctx.fillStyle = rightEyeGradient
      ctx.fill()
      
      // Mouth
      const mouthGradient = ctx.createRadialGradient(
        canvas.width * faceData.mouth.x, 
        canvas.height * faceData.mouth.y,
        0,
        canvas.width * faceData.mouth.x, 
        canvas.height * faceData.mouth.y,
        canvas.width * faceData.mouth.width
      )
      mouthGradient.addColorStop(0, `rgba(167, 139, 250, ${mouthIntensity})`)
      mouthGradient.addColorStop(1, 'rgba(167, 139, 250, 0)')
      
      ctx.beginPath()
      ctx.ellipse(
        canvas.width * faceData.mouth.x, 
        canvas.height * faceData.mouth.y, 
        canvas.width * faceData.mouth.width, 
        canvas.width * faceData.mouth.width / 2, 
        0, 
        0, 
        Math.PI * 2
      )
      ctx.fillStyle = mouthGradient
      ctx.fill()
    }
    
    if (isRecording) {
      startVideoStream().then(() => {
        animationFrame = requestAnimationFrame(updateChart)
      })
    }
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      
      if (processingInterval) {
        clearInterval(processingInterval)
      }
    }
  }, [isRecording, emotionData, currentTime, faceData])

  const toggleRecording = () => {
    setIsRecording(prev => !prev)
  }

  return (
    <section ref={ref} id="visualization" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Dynamic Emotion Recognition</h2>
          <p className="text-lg text-neutral-600 mb-6">Real-time AI analysis of your baby's emotional state</p>
          
          <button 
            onClick={toggleRecording}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isRecording ? 'Stop Analysis' : 'Start Analysis'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Video Feed */}
          <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <h3 className="text-xl font-semibold mb-4 text-black">Live Feed</h3>
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
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
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Status: {isRecording ? 'Analyzing...' : 'Ready'}</span>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Emotion Timeline Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">Emotion Timeline</h3>
            <div className="relative h-64">
              <canvas ref={chartRef} className="w-full h-full"></canvas>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <span className="flex items-center text-sm">
                <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                Happy
              </span>
              <span className="flex items-center text-sm">
                <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                Calm
              </span>
              <span className="flex items-center text-sm">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                Active
              </span>
            </div>
          </div>

          {/* Emotion Heatmap */}
          <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInRight">
            <h3 className="text-xl font-semibold mb-4 text-black">Emotion Heatmap</h3>
            <div className="relative h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
              <canvas 
                ref={heatmapRef} 
                className="w-full h-full"
                width="300"
                height="300"
              />
              
              {!faceData && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-neutral-400 text-sm">
                    {isRecording ? 'Waiting for data...' : 'Start analysis to see heatmap'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Low</span>
                <div className="h-2 w-48 bg-gradient-to-r from-neutral-200 via-pink-400 to-purple-500 rounded-full"></div>
                <span className="text-sm text-neutral-600">High</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Historical Data Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn">
          <h3 className="text-2xl font-semibold mb-6 text-black">Emotional Insights</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <h4 className="font-medium text-pink-700 mb-2">Happiness Analysis</h4>
              <p className="text-neutral-700 text-sm">
                {emotionData.happy.length > 0 
                  ? `Current happiness level: ${emotionData.happy[emotionData.happy.length-1]}%. ${
                      emotionData.happy[emotionData.happy.length-1] > 70 
                        ? 'Your baby appears very happy!'
                        : emotionData.happy[emotionData.happy.length-1] > 50
                          ? 'Your baby seems content.'
                          : 'Your baby may need some attention.'
                    }`
                  : 'Start analysis to see happiness insights.'}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-700 mb-2">Calmness Analysis</h4>
              <p className="text-neutral-700 text-sm">
                {emotionData.calm.length > 0 
                  ? `Current calmness level: ${emotionData.calm[emotionData.calm.length-1]}%. ${
                      emotionData.calm[emotionData.calm.length-1] > 70 
                        ? 'Your baby is very relaxed.'
                        : emotionData.calm[emotionData.calm.length-1] > 50
                          ? 'Your baby is moderately calm.'
                          : 'Your baby may be experiencing some stress.'
                    }`
                  : 'Start analysis to see calmness insights.'}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Activity Analysis</h4>
              <p className="text-neutral-700 text-sm">
                {emotionData.active.length > 0 
                  ? `Current activity level: ${emotionData.active[emotionData.active.length-1]}%. ${
                      emotionData.active[emotionData.active.length-1] > 70 
                        ? 'Your baby is very active and engaged.'
                        : emotionData.active[emotionData.active.length-1] > 50
                          ? 'Your baby shows moderate activity.'
                          : 'Your baby appears relatively inactive right now.'
                    }`
                  : 'Start analysis to see activity insights.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}