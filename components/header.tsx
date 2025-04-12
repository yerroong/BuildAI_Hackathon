"use client"

import { Sparkles } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="w-full flex justify-end mb-4">
        <ModeToggle />
      </div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-purple-800 dark:text-purple-400" />
        <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-400">HackDoc</h1>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-md">AI-powered Document Assistant for Developers</p>
    </header>
  )
}
