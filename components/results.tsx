"use client"

import { useState } from "react"
import { FileText, ArrowLeft, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { TechIcon } from "@/components/tech-icon"

interface ResultsProps {
  results: {
    summary: string
    techStack: Array<{ name: string; icon: string }>
    keyFeatures: string[]
    deadline: string
  }
  fileName?: string
  onReset: () => void
}

export function Results({ results, fileName, onReset }: ResultsProps) {
  const [checkedSections, setCheckedSections] = useState({
    summary: false,
    techStack: false,
    keyFeatures: false,
    timeline: false,
  })

  const toggleSection = (section: keyof typeof checkedSections) => {
    setCheckedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-purple-800 dark:text-purple-400 mr-2" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">{fileName || "Document Analysis"}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="border-purple-800 text-purple-800 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Upload Another Document
        </Button>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        <Card className="p-6 shadow-md border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="summary-check"
                checked={checkedSections.summary}
                onCheckedChange={() => toggleSection("summary")}
                className="border-purple-800 data-[state=checked]:bg-purple-800 data-[state=checked]:text-white"
              />
              <label
                htmlFor="summary-check"
                className="text-lg font-semibold text-purple-800 dark:text-purple-400 cursor-pointer"
              >
                Summary
              </label>
            </div>
            {checkedSections.summary && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />}
          </div>
          <p className="text-gray-700 dark:text-gray-300">{results.summary}</p>
        </Card>

        {/* Project Timeline */}
        <Card className="p-6 shadow-md border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="timeline-check"
                checked={checkedSections.timeline}
                onCheckedChange={() => toggleSection("timeline")}
                className="border-purple-800 data-[state=checked]:bg-purple-800 data-[state=checked]:text-white"
              />
              <label
                htmlFor="timeline-check"
                className="text-lg font-semibold text-purple-800 dark:text-purple-400 cursor-pointer"
              >
                Project Timeline
              </label>
            </div>
            {checkedSections.timeline && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />}
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-purple-800 dark:text-purple-400 mr-2" />
            <p className="text-purple-800 dark:text-purple-400 font-medium">{results.deadline}</p>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-6 shadow-md border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="features-check"
                checked={checkedSections.keyFeatures}
                onCheckedChange={() => toggleSection("keyFeatures")}
                className="border-purple-800 data-[state=checked]:bg-purple-800 data-[state=checked]:text-white"
              />
              <label
                htmlFor="features-check"
                className="text-lg font-semibold text-purple-800 dark:text-purple-400 cursor-pointer"
              >
                Key Features
              </label>
            </div>
            {checkedSections.keyFeatures && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />}
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
        </Card>

        {/* Tech Stack */}
        <Card className="p-6 shadow-md border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="tech-check"
                checked={checkedSections.techStack}
                onCheckedChange={() => toggleSection("techStack")}
                className="border-purple-800 data-[state=checked]:bg-purple-800 data-[state=checked]:text-white"
              />
              <label
                htmlFor="tech-check"
                className="text-lg font-semibold text-purple-800 dark:text-purple-400 cursor-pointer"
              >
                Tech Stack
              </label>
            </div>
            {checkedSections.techStack && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />}
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
        </Card>
      </div>
    </div>
  )
}