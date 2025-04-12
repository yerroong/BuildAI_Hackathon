"use client"

import { Calendar, FileText, Layers, PuzzleIcon as PuzzlePiece } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechIcon } from "@/components/tech-icon"

interface ResultsDisplayProps {
  results: {
    summary: string
    techStack: Array<{ name: string; icon: string }>
    keyFeatures: string[]
    deadline: string
  }
  activeTab: string
}

export function ResultsDisplay({ results, activeTab }: ResultsDisplayProps) {
  return (
    <Card className="p-6 shadow-md border-gray-200 dark:bg-zinc-900 dark:border-gray-700">
      {activeTab === "summary" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-800 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">Summary</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{results.summary}</p>
        </div>
      )}

      {activeTab === "techStack" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-800 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.techStack.map((tech, index) => (
              <Badge
                key={index}
                className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 px-3 py-1 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900/50"
              >
                <TechIcon name={tech.icon} className="mr-1 h-4 w-4" />
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {activeTab === "keyFeatures" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PuzzlePiece className="h-5 w-5 text-purple-800 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">Key Features</h3>
          </div>
          <ul className="space-y-2">
            {results.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-800 text-xs mr-2 mt-0.5 dark:bg-purple-900/30 dark:text-purple-300">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-800 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400"> Project Timeline</h3>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-purple-800 dark:text-purple-400 mr-2" />
            <p className="text-purple-800 dark:text-purple-400 font-medium">{results.deadline}</p>
          </div>
        </div>
      )}
    </Card>
  )
}