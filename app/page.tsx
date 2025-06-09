"use client"

import Image from "next/image"
import { useState } from "react"
import { WaitlistForm } from "@/components/waitlist-form"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Confetti } from "@/components/ui/confetti"
import { MarketingContent } from "@/components/marketing-content"

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <div className="relative w-full min-h-dvh flex flex-col">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} duration={3000} />

      {/* Main content area - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <header className="flex flex-col items-center justify-center z-10 mb-8 sm:mb-12">
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

            <div className="text-center z-10">
              <p className="font-mono text-muted-foreground text-xs leading-relaxed max-w-md px-2">
                OLTP, OLAP, and AI orchestration is about to get easier with Data Atmos
              </p>
            </div>
          </header>

          <MarketingContent />
        </div>
      </div>

      <div className="w-full pb-16 sm:pb-20">
        <WaitlistForm onShowConfetti={() => setShowConfetti(true)} />
      </div>

      {/* Footer */}
      <footer className="w-full py-4 z-10">
        <div className="flex items-center justify-center gap-2 font-mono text-muted-foreground text-[10px]">
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
