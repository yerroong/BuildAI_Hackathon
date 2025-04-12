"use client"

import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LoadingStateProps {
  fileName?: string
  onReset: () => void
}

export function LoadingState({ fileName, onReset }: LoadingStateProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-8 flex flex-col items-center justify-center text-center shadow-md dark:bg-zinc-900 dark:border-gray-700">
      <Button
        variant="outline"
        size="sm"
        className="self-start mb-4 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        onClick={onReset}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <Loader2 className="h-12 w-12 text-purple-800 dark:text-purple-400 animate-spin mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Analyzing your document...</h2>
      <p className="text-gray-600 dark:text-gray-400">Our AI is extracting insights from {fileName}</p>
    </Card>
  )
}
