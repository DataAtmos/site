"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ReactConfetti = dynamic(() => import("react-confetti"), { 
  ssr: false,
  loading: () => null 
})

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
}

export function Confetti({ show, onComplete, duration = 3000 }: ConfettiProps) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: false
  })

  useEffect(() => {
    const updateDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      })
    }
    
    updateDimensions()
    
    window.addEventListener("resize", updateDimensions)
    
    let timer: NodeJS.Timeout | null = null
    
    if (show && onComplete) {
      timer = setTimeout(() => {
        onComplete()
      }, duration)
    }
    
    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (timer) clearTimeout(timer)
    }
  }, [show, onComplete, duration])

  if (!show || !windowSize.width || !windowSize.height) return null

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={windowSize.isMobile ? 30 : 50}
      recycle={false}
      tweenDuration={duration}
      gravity={0.3}
    />
  )
} 