import Navbar from "../Components/Navbar/Navbar"
import Hero from "../Components/Hero/Hero"
import Features from "../Components/Features/Features"
import Demo from "../Components/Demo/Demo"
import UseCases from "../Components/UseCases/UseCases"
import Visualization from "../Components/Visualization/Visualization"
import Testimonials from "../Components/Testimonials/Testimonials"
import Contact from "../Components/Contact/Contact"
import Footer from "../Components/Footer/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 relative">
        <Hero />
        <Features />
        <Demo />
        <UseCases />
        <Visualization />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

