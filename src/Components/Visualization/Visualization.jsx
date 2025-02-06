"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function Visualization() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
            datasets: [
              {
                label: "Happy",
                data: [65, 75, 60, 80, 70, 65],
                borderColor: "rgb(244, 114, 182)",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Calm",
                data: [70, 65, 75, 60, 75, 70],
                borderColor: "rgb(167, 139, 250)",
                tension: 0.4,
                fill: false,
              },
              {
                label: "Active",
                data: [60, 70, 65, 75, 65, 60],
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
  }, [])

  return (
    <section id="visualization" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Emotion Recognition Visualization</h2>
          <p className="text-lg text-neutral-600">Advanced analytics to track your baby's emotional journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Emotion Timeline Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
            <h3 className="text-2xl font-semibold mb-6">Daily Emotion Timeline</h3>
            <div className="relative h-80">
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
          <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-semibold mb-6">Emotion Intensity Heatmap</h3>
            <div className="relative h-80 bg-neutral-50 rounded-lg p-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Face Outline */}
                  <div className="absolute inset-0 rounded-full border-2 border-neutral-300"></div>
                  {/* Eyes Area */}
                  <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 opacity-70"></div>
                  <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 opacity-70"></div>
                  {/* Mouth Area */}
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-purple-300 to-purple-400 opacity-70 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Low Intensity</span>
                <div className="h-2 w-48 bg-gradient-to-r from-neutral-200 via-pink-400 to-purple-500 rounded-full"></div>
                <span className="text-sm text-neutral-600">High Intensity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

