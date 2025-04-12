"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function LoadingState() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#6B21A8]/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#6B21A8] rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-medium text-center">Analyzing your document...</h3>
        <p className="text-zinc-400 text-center mt-2">This may take a moment as we extract key information</p>
      </CardContent>
    </Card>
  )
}
