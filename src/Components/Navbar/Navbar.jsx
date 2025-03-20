"use client"

import { useState } from "react"
import Link from "next/link"
import { logo } from "@/assets/logo/index"

export default function Navbar({ sectionRefs }) {
  const [isOpen, setIsOpen] = useState(false)
  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-1" onClick={() => scrollToSection("hero")}>
              <img src={logo.src} alt="logo" height={30} width={30}/>
              <span className="text-2xl font-bold">BabyEmo</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {Object.keys(sectionRefs).filter(key => key !== "hero").map((key) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-neutral-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Home
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Features
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Demo
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Use Cases
            </Link>
            <Link
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700"
            >
              Visualization
            </Link>
            <Link
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700"
            >
              Testimonials
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Pricing
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

