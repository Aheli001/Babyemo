"use client"

import { motion } from "framer-motion"
import { Frown } from "lucide-react"

const ErrorPopup = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2" />

        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Frown className="text-red-500 w-10 h-10" />
            </div>

            <h2 className="text-xl font-semibold text-neutral-800 mb-2">Something went wrong</h2>

            <p className="text-neutral-600 mb-6 max-w-sm">{message}</p>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:from-pink-600 hover:to-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ErrorPopup

