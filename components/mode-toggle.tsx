"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${
          theme === "light"
            ? "bg-purple-100 text-purple-800 border-purple-300"
            : "bg-transparent text-gray-400 border-gray-700"
        }`}
        onClick={() => setTheme("light")}
        aria-label="Switch to light mode"
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${
          theme === "dark"
            ? "bg-purple-900 text-purple-200 border-purple-700"
            : "bg-transparent text-gray-400 border-gray-300"
        }`}
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark mode"
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  )
}
