export default function Hero() {
  return (
    <section id="hero" className="bg-neutral-900 text-white min-h-[70vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-90"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate__animated animate__fadeInLeft">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Understanding Your Baby's Emotions
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8">
              Advanced AI-powered emotion detection system that helps you understand your newborn's emotional state in
              real-time through facial expressions and sounds.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105 animate__animated animate__pulse animate__infinite">
                Try Demo Now
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-semibold px-8 py-3 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative animate__animated animate__fadeInRight">
            <div className="bg-gradient-to-br from-pink-300 to-purple-400 rounded-full w-72 h-72 mx-auto flex items-center justify-center p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">👶</div>
                <div className="space-y-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Happy: 85%</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Calm: 90%</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">Alert: 75%</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-sm">
                Real-time Detection
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg  viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

