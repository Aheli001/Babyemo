"use client"

import { useState } from "react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Mom",
      avatar: "S",
      content:
        "This system has been a game-changer! As a new mom, it helps me understand my baby's needs before they start crying. The emotional tracking is incredibly accurate.",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      avatar: "D",
      content:
        "An excellent tool for monitoring infant emotional development. The detailed analytics help us track progress and identify potential concerns early.",
      rating: 5,
    },
    {
      name: "Rachel & Tom",
      role: "Parents of Twins",
      avatar: "R",
      content:
        "Managing twins became so much easier with this system. We can monitor both babies' emotional states and respond to their needs promptly.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">What Parents Say</h2>
          <p className="text-lg text-neutral-600">Real experiences from families using our emotion detection system</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-${["pink", "purple", "blue"][index]}-50 rounded-2xl p-8 shadow-lg transform transition duration-300 hover:-translate-y-2 animate__animated animate__fadeInUp`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r from-${["pink", "purple", "blue"][index]}-400 to-${["purple", "blue", "green"][index]}-500 flex items-center justify-center text-white font-bold text-xl`}
                >
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-2">{"★".repeat(testimonial.rating)}</div>
                <p className="text-neutral-700">{`"${testimonial.content}"`}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center items-center mt-12 gap-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-pink-400" : "bg-neutral-300 hover:bg-pink-400"} transition-colors`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105 animate__animated animate__pulse animate__infinite">
            Join Happy Parents
          </button>
        </div>
      </div>
    </section>
  )
}

