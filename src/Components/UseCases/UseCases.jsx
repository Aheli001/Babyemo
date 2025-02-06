export default function UseCases() {
  return (
    <section id="usecases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">How It Helps</h2>
          <p className="text-lg text-neutral-600">Empowering parents and healthcare professionals</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Parenting Support Card */}
          <div className="bg-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate__animated animate__fadeInUp">
            <div className="text-4xl mb-6">👶</div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Parenting Support</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-pink-600 mb-2">Needs Identification</h4>
                <p className="text-neutral-600">Instantly understand if your baby is hungry, tired, or uncomfortable</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-pink-600 mb-2">Emotional Tracking</h4>
                <p className="text-neutral-600">Monitor emotional patterns throughout the day</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-pink-600 mb-2">Preventive Care</h4>
                <p className="text-neutral-600">Anticipate needs before crying occurs</p>
              </div>
            </div>
          </div>

          {/* Healthcare Applications Card */}
          <div
            className="bg-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-4xl mb-6">👨‍⚕️</div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Healthcare Applications</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-purple-600 mb-2">Clinical Monitoring</h4>
                <p className="text-neutral-600">Aid pediatricians in developmental assessments</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-purple-600 mb-2">Early Detection</h4>
                <p className="text-neutral-600">Identify potential developmental concerns early</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-purple-600 mb-2">Progress Tracking</h4>
                <p className="text-neutral-600">Monitor treatment effectiveness over time</p>
              </div>
            </div>
          </div>

          {/* Dashboard Features Card */}
          <div
            className="bg-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-4xl mb-6">📊</div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Smart Dashboard</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Trend Analysis</h4>
                <p className="text-neutral-600">View emotional patterns and trends over time</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Custom Reports</h4>
                <p className="text-neutral-600">Generate detailed emotional health reports</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Smart Alerts</h4>
                <p className="text-neutral-600">Receive notifications for significant changes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full transform transition hover:scale-105 animate__animated animate__pulse animate__infinite">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}

