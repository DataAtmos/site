"use client"

import { Github, Twitter } from "lucide-react"

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://x.com/dataatmos"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-mono text-green-700 hover:text-green-400 text-xs transition-colors"
      >
        <Twitter size={12} />
        <span>@dataatmos</span>
      </a>
      <span className="text-green-800">|</span>
      <a
        href="https://github.com/dataatmos"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-mono text-green-700 hover:text-green-400 text-xs transition-colors"
      >
        <Github size={12} />
        <span>dataatmos</span>
      </a>
    </div>
  )
}
