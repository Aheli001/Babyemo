"use client"

import { useState } from "react"

export default function Demo() {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <section id="demo" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Try Our Demo</h2>
          <p className="text-lg text-neutral-600">Experience real-time emotion detection in action</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Demo Interface */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">Upload Image or Video</h3>
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
              </div>
            </div>

            <div className="mb-6">
              <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg transform transition hover:scale-105">
                Start Detection
              </button>
            </div>

            <div id="webcamOption" className="text-center">
              <button className="text-purple-600 hover:text-purple-700 font-medium">Or Try with Webcam →</button>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-semibold mb-6">Emotion Analysis</h3>

            <div className="mb-8">
              <div className="flex items-center justify-center h-48 bg-neutral-50 rounded-lg mb-6">
                <div className="text-6xl">👶</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-700">Happiness</span>
                    <span className="text-pink-500 font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-700">Calmness</span>
                    <span className="text-purple-500 font-semibold">60%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-700">Alertness</span>
                    <span className="text-blue-500 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-neutral-700 text-sm">
                <span className="font-semibold">Analysis:</span> Baby appears to be in a positive mood with high
                alertness levels. Recommended action: Perfect time for interactive play or learning activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}