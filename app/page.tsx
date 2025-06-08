"use client"

import Image from "next/image"
import { useState } from "react"
import { WaitlistForm } from "@/components/waitlist-form"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Confetti } from "@/components/ui/confetti"

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} duration={3000} />

      <header className="flex flex-col items-center justify-center z-10">
        <div className="mb-8">
          <div className="relative">
            <Image src="/logo.svg" alt="Data Atmos Logo" width={60} height={60} priority className="dark:hidden" />
            <Image
              src="/logo-white.svg"
              alt="Data Atmos Logo"
              width={60}
              height={60}
              priority
              className="hidden dark:block"
            />
          </div>
        </div>

        <div className="text-center z-10 px-4 mb-16">
          <p className="font-mono text-muted-foreground text-xs leading-relaxed max-w-md">
            OLTP, OLAP, and AI orchestration is about to get easier with Data Atmos
          </p>
        </div>
      </header>

      <WaitlistForm onShowConfetti={() => setShowConfetti(true)} />

      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 font-mono text-muted-foreground text-[10px]">
          <a href="https://x.com/dataatmos" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            @x/dataatmos
          </a>
          <span>·</span>
          <a
            href="https://github.com/dataatmos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            @github/dataatmos
          </a>
          <span>·</span>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}
