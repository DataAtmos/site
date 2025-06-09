"use client"

import { CalendarCheckIcon } from "@/components/ui/calendar-check"

interface ScheduleMeetingProps {
    calLink?: string
  }
  
  export function ScheduleMeeting({
    calLink = process.env.NEXT_PUBLIC_CAL_LINK || "raghuvr/data-atmos-demo",
  }: ScheduleMeetingProps) {
    const handleScheduleClick = () => {
      window.open(`https://cal.com/${calLink}`, "_blank", "noopener,noreferrer")
    }
  
    return (
      <div className="flex items-center justify-center">
        <button
          onClick={handleScheduleClick}
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <CalendarCheckIcon size={12} className="flex-shrink-0" />
          <span className="underline decoration-dotted underline-offset-4 decoration-muted-foreground group-hover:decoration-foreground transition-colors duration-200">
            Click here to schedule a demo
          </span>
        </button>
      </div>
    )
  }
  
