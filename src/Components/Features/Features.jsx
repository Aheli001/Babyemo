export default function Features({ref}) {
  return (
    <section ref={ref} id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Key Features</h2>
          <p className="text-lg text-neutral-600">Advanced capabilities to understand your baby better</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-pink-50 rounded-xl p-8 transition-transform duration-300 hover:transform hover:scale-105 animate__animated animate__fadeInUp">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Real-time Detection</h3>
            <p className="text-neutral-600">Instant emotion analysis with 99% accuracy using advanced AI algorithms.</p>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Instant Results
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                High Precision
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div
            className="bg-purple-50 rounded-xl p-8 transition-transform duration-300 hover:transform hover:scale-105 animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Multiple Emotion Detection</h3>
            <p className="text-neutral-600">
              Detects various emotional states including happiness, sadness, discomfort, and more.
            </p>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                7+ Emotions
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Detailed Analysis
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div
            className="bg-blue-50 rounded-xl p-8 transition-transform duration-300 hover:transform hover:scale-105 animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Advanced Analytics</h3>
            <p className="text-neutral-600">Comprehensive reporting and trends analysis over time.</p>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Daily Reports
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Trend Analysis
              </li>
            </ul>
          </div>
        </div>

        
      </div>
    </section>
  )
}

