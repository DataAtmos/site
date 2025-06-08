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
      }
    })
  }

  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch">
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
            style={{
              width: "100%",
              paddingLeft: "12px",
            }}
            className={`flex-1 font-mono text-base sm:text-xs pl-0 pr-0 py-2 border-0 border-b rounded-none sm:w-[450px] ${
              emailError ? "border-red-500" : ""
            }`}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="font-mono text-base sm:text-xs border-0 border-b rounded-none w-full sm:w-40 justify-between"
              >
                {type === "indie" ? "Indie Developer" : "Organization"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setType("indie")} className="font-mono text-base sm:text-xs">
                Indie Developer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("org")} className="font-mono text-base sm:text-xs">
                Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="submit"
            disabled={isPending}
            className="font-mono text-base sm:text-xs px-6 py-2 sm:w-40 w-full mt-2 sm:mt-0 whitespace-nowrap rounded-none bg-black text-white hover:bg-black/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
          >
            {isPending ? "..." : "Join the waitlist"}
          </Button>
        </div>

        {emailError && <p className="font-mono text-red-400 text-xs">{emailError}</p>}
      </form>
    </div>
  )
}