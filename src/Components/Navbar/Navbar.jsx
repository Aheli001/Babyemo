"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "../../utils/utils"

export default function Navbar({ sectionRefs }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section) => {
    setIsOpen(false)
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          scrolled ? "bg-neutral-900/95 backdrop-blur-md shadow-lg py-2" : "bg-neutral-900 py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection("hero")}>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 transition-all">
                BabyEmo
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {Object.keys(sectionRefs)
                .filter((key) => key !== "hero")
                .map((key) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="relative px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white transition-colors group"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-white hover:bg-neutral-800 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-neutral-900/90 backdrop-blur-md md:hidden transition-all duration-300 flex flex-col",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        )}
      >
        <div className="flex-1 overflow-y-auto pt-20 px-6">
          <div className="space-y-2 py-6">
            {Object.keys(sectionRefs)
              .filter((key) => key !== "hero")
              .map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-left text-white hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="text-lg font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                </button>
              ))}
          </div>

        </div>
      </div>
    </>
  )
}

