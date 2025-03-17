'use client'
import Navbar from "../Components/Navbar/Navbar"
import Hero from "../Components/Hero/Hero"
import Features from "../Components/Features/Features"
import Demo from "../Components/Demo/Demo"
import UseCases from "../Components/UseCases/UseCases"
import Visualization from "../Components/Visualization/Visualization"
import Contact from "../Components/Contact/Contact"
import Footer from "../Components/Footer/Footer"
import { useRef } from "react"

export default function Home() {
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    demo: useRef(null),
    usecases: useRef(null),
    visualization: useRef(null),
    contact: useRef(null),
  };
  return (
    <>
      <Navbar sectionRefs={sectionRefs}/>
      <main id="main-content" className="flex-1 relative">
        <Hero sectionRefs={sectionRefs}/>
        <Features ref={sectionRefs.features}/>
        <Demo ref={sectionRefs.demo}/>
        <UseCases ref={sectionRefs.usecases}/>
        <Visualization ref={sectionRefs.visualization}/>
        <Contact ref={sectionRefs.contact}/>
      </main>
      <Footer />
    </>
  )
}

