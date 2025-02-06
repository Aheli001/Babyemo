import "./globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { React} from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BabyEmo - Understanding Your Baby's Emotions",
  description: "Advanced AI-powered emotion detection system for newborns",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-gray-800 min-h-screen flex flex-col`}>{children}</body>
    </html>
  )
}

