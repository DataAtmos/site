"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { joinWaitlist } from "@/lib/actions"
import { toast } from "sonner"
import ReactConfetti from "react-confetti"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [email, setEmail] = useState("")
  const [type, setType] = useState("indie")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [emailError, setEmailError] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value) validateEmail(value)
    else setEmailError("")
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validateEmail(email)) return

      setIsSubmitting(true)
      try {
        const result = await joinWaitlist(email, type)
        if (result.status === "success") {
          if (result.isNew) {
            setShowConfetti(true)
            toast.success("Success! You've been added to our waitlist. We'll notify you when we're ready.")
            setEmail("")
            setType("indie")
            setEmailError("")
            setTimeout(() => setShowConfetti(false), 3000)
          } else {
            toast.info("Already registered. You're already in our waitlist. We'll notify you once we're ready.")
          }
        } else {
          toast.error(result.message || "Something went wrong. Please try again.")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, type],
  )

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = isDarkMode ? "white" : "black"
      ctx.save()

      const logoSize = isMobile ? 60 : 60
      ctx.translate(canvas.width / 2 - logoSize / 2, canvas.height / 2 - logoSize / 2 - 40)

      ctx.save()
      const scale = logoSize / 100
      ctx.scale(scale, scale)
      ctx.translate(250, -350)

      ctx.beginPath()
      const logoPath =
        "M-167.5,390.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C-165.5,389.6-166.4,390.5-167.5,390.5z   M-177.5,428.5c-2.2,0-4-1.8-4-4s1.8-4,4-4c2.2,0,4,1.8,4,4S-175.3,428.5-177.5,428.5z M-177.5,410.5c-2.2,0-4-1.8-4-4s1.8-4,4-4  c2.2,0,4,1.8,4,4S-175.3,410.5-177.5,410.5z M-177.5,392.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C-173.5,390.7-175.3,392.5-177.5,392.5z M-177.5,374.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C-173.5,372.7-175.3,374.5-177.5,374.5z M-194.5,414.5c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7  C-187.5,411.4-190.6,414.5-194.5,414.5z M-194.5,394.5c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7  C-187.5,391.4-190.6,394.5-194.5,394.5z M-195.5,374.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C-191.5,372.7-193.3,374.5-195.5,374.5z M-195.5,362.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2  C-193.5,361.6-194.4,362.5-195.5,362.5z M-214.5,414.5c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7s7,3.1,7,7  C-207.5,411.4-210.6,414.5-214.5,414.5z M-214.5,394.5c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7s7,3.1,7,7  C-207.5,391.4-210.6,394.5-214.5,394.5z M-213.5,374.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C-209.5,372.7-211.3,374.5-213.5,374.5z M-213.5,362.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2  C-211.5,361.6-212.4,362.5-213.5,362.5z M-231.5,374.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C-227.5,372.7-229.3,374.5-231.5,374.5z M-231.5,384.5c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4  C-235.5,386.3-233.7,384.5-231.5,384.5z M-241.5,408.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2  C-239.5,407.6-240.4,408.5-241.5,408.5z M-241.5,390.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2  C-239.5,389.6-240.4,390.5-241.5,390.5z M-231.5,402.5c2.2,0,4,1.8,4,4s-1.8,4-4,4c-2.2,0-4-1.8-4-4S-233.7,402.5-231.5,402.5z   M-231.5,420.5c2.2,0,4,1.8,4,4s-1.8,4-4,4c-2.2,0-4-1.8-4-4S-233.7,420.5-231.5,420.5z M-213.5,420.5c2.2,0,4,1.8,4,4  c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4C-217.5,422.3-215.7,420.5-213.5,420.5z M-213.5,432.5c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2  c-1.1,0-2-0.9-2-2C-215.5,433.4-214.6,432.5-213.5,432.5z M-195.5,420.5c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4  C-199.5,422.3-197.7,420.5-195.5,420.5z M-195.5,432.5c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2  C-197.5,433.4-196.6,432.5-195.5,432.5z M-167.5,404.5c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2  C-169.5,405.4-168.6,404.5-167.5,404.5z"

      const path = new Path2D(logoPath)
      ctx.fill(path)
      ctx.restore()
      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return scale
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: isMobile ? Math.random() * 1.0 + 0.5 : Math.random() * 0.8 + 0.3,
            color: isDarkMode ? "white" : "black",
            scatteredColor: "#3B82F6",
            life: Math.random() * 100 + 50,
          }
        }
      }
      return null
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return
      const baseParticleCount = isMobile ? 4000 : 3000
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = isDarkMode ? "black" : "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 200

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 40
          const moveY = Math.sin(angle) * force * 40
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.08
          p.y += (p.baseY - p.y) * 0.08
          ctx.fillStyle = p.color
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = isMobile ? 4000 : 3000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isTouchingRef.current = true
      }
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, isDarkMode])

  const getEmailInputWidth = () => {
    if (!email) return undefined
    const width = Math.max(200, email.length * 8 + 40)
    return `${width}px`
  }

  const bgColor = isDarkMode ? "bg-black" : "bg-white"
  const textColor = isDarkMode ? "text-gray-400" : "text-gray-600"
  const inputBgColor = isDarkMode ? "bg-black" : "bg-white"
  const inputTextColor = isDarkMode ? "text-white" : "text-black"
  const inputBorderColor = isDarkMode ? "border-gray-800" : "border-gray-300"
  const inputFocusBorderColor = isDarkMode ? "focus:border-gray-500" : "focus:border-gray-600"
  const placeholderColor = isDarkMode ? "placeholder:text-gray-600" : "placeholder:text-gray-400"
  const buttonBgColor = isDarkMode ? "bg-white" : "bg-black"
  const buttonTextColor = isDarkMode ? "text-black" : "text-white"
  const socialLinkColor = isDarkMode ? "text-gray-700" : "text-gray-500"
  const socialLinkHoverColor = isDarkMode ? "hover:text-gray-500" : "hover:text-gray-700"

  return (
    <div className={`relative w-full h-dvh flex flex-col items-center justify-center ${bgColor}`}>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={isMobile ? 30 : 50}
          recycle={false}
          tweenDuration={3000}
          gravity={0.3}
        />
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-full absolute top-0 left-0 ${isMobile ? "" : "touch-none"}`}
        aria-label="Interactive particle effect with Data Atmos logo"
        style={{
          touchAction: isMobile ? "manipulation" : "none",
        }}
      />

      <div className="absolute top-1/2 mt-16 text-center z-10 px-4">
        <p className={`font-mono ${textColor} text-xs leading-relaxed max-w-md`}>
          OLTP, OLAP, and AI orchestration is about to get easier with Data Atmos
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg px-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={handleEmailChange}
              required
              style={{
                width: isMobile ? "100%" : getEmailInputWidth(),
                transition: "width 0.2s ease-in-out",
              }}
              className={`flex-1 font-mono text-xs ${inputBgColor} border-0 border-b ${inputBorderColor} ${inputTextColor} ${placeholderColor} ${inputFocusBorderColor} focus:outline-none px-0 py-2 ${
                emailError ? "border-red-500" : ""
              } ${isMobile ? "rounded-none shadow-none" : ""}`}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`font-mono text-xs ${inputBgColor} border-0 border-b ${inputBorderColor} ${inputTextColor} ${inputFocusBorderColor} focus:outline-none px-0 py-2 sm:w-40 ${
                isMobile ? "rounded-none shadow-none" : ""
              }`}
            >
              <option value="indie">Indie Developer</option>
              <option value="org">Organization</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-mono text-xs ${buttonBgColor} ${buttonTextColor} px-6 py-2 disabled:opacity-50 transition-opacity sm:w-40 w-full mt-2 sm:mt-0 whitespace-nowrap ${
                isMobile ? "rounded-none shadow-none" : ""
              }`}
            >
              {isSubmitting ? "..." : "Join the waitlist"}
            </button>
          </div>

          {emailError && <p className="font-mono text-red-400 text-xs">{emailError}</p>}
        </form>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className={`flex items-center gap-2 font-mono ${socialLinkColor} text-[10px]`}>
          <a href="https://x.com/dataatmos" target="_blank" rel="noopener noreferrer" className={socialLinkHoverColor}>
            @x/dataatmos
          </a>
          <span>·</span>
          <a
            href="https://github.com/dataatmos"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkHoverColor}
          >
            @github/dataatmos
          </a>
        </div>
      </div>
    </div>
  )
}
