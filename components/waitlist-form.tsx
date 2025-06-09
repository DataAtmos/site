"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { joinWaitlist } from "@/lib/actions"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface WaitlistFormProps {
  onShowConfetti: () => void
}

export function WaitlistForm({ onShowConfetti }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [type, setType] = useState("indie")
  const [isPending, startTransition] = useTransition()
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) return

    startTransition(async () => {
      try {
        const result = await joinWaitlist(email, type)
        if (result.status === "success") {
          if (result.isNew) {
            onShowConfetti()
            toast.success("Success! You've been added to our waitlist.")
            setEmail("")
          } else {
            toast.info("You're already in our waitlist.")
          }
        } else {
          toast.error(result.message || "Something went wrong.")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
        console.error(error)
      }
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (e.target.value) validateEmail(e.target.value)
              else setEmailError("")
            }}
            required
            className={`flex-1 font-mono text-sm sm:text-xs px-3 py-2 border-0 border-b rounded-none ${
              emailError ? "border-red-500" : ""
            }`}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="font-mono text-sm sm:text-xs border-0 border-b rounded-none w-full sm:w-40 justify-between"
              >
                {type === "indie" ? "Indie Developer" : "Organization"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setType("indie")} className="font-mono text-sm sm:text-xs">
                Indie Developer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("org")} className="font-mono text-sm sm:text-xs">
                Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="submit"
            disabled={isPending}
            className="font-mono text-sm sm:text-xs px-6 py-2 sm:w-40 w-full whitespace-nowrap rounded-none bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {isPending ? "..." : "Join the waitlist"}
          </Button>
        </div>

        {emailError && <p className="font-mono text-red-400 text-xs px-3">{emailError}</p>}
      </form>
    </div>
  )
}
