"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">BabyEmo</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="#hero" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="#features" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Features
                </Link>
                <Link href="#demo" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Demo
                </Link>
                <Link href="#usecases" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Use Cases
                </Link>
                <Link href="#visualization" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Visualization
                </Link>
                <Link href="#testimonials" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Testimonials
                </Link>
                <Link href="#contact" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
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
            <Link href="#hero" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Home
            </Link>
            <Link href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Features
            </Link>
            <Link href="#demo" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Demo
            </Link>
            <Link href="#usecases" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Use Cases
            </Link>
            <Link
              href="#visualization"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700"
            >
              Visualization
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Pricing
            </Link>
            <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-700">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

