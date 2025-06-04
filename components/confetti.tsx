"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"
import { useMobile } from "@/hooks/use-mobile"

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isMobile = useMobile()

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={isMobile ? 30 : 50} // Reduced intensity
      recycle={false}
      tweenDuration={3000} // Shorter duration
      colors={["#00ff00", "#00bfff", "#ffffff"]} // Terminal colors
      gravity={0.3} // Slower fall
    />
  )
}
