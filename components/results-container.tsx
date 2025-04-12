"use client"
import { useState } from "react"
import { Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTabs } from "@/components/section-tabs"
import { ResultsDisplay } from "@/components/results-display"
import { WalletControls } from "@/components/wallet-controls"
import { useToast } from "@/components/ui/use-toast"

interface ResultsContainerProps {
  results: {
    summary: string
    techStack: Array<{ name: string; icon: string }>
    keyFeatures: string[]
    deadline: string
  }
  fileName?: string
  onReset: () => void
}

export function ResultsContainer({ results, fileName, onReset }: ResultsContainerProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const { toast } = useToast()

  const downloadResults = (format: "txt" | "json") => {
    let content: string
    let mimeType: string
    let fileExtension: string

    if (format === "json") {
      content = JSON.stringify(results, null, 2)
      mimeType = "application/json"
      fileExtension = "json"
    } else {
      content =
        `Summary: ${results.summary}\n\n` +
        `Project Timeline: ${results.deadline}\n\n` +
        `Key Features:\n${results.keyFeatures.map((f) => `- ${f}`).join("\n")}\n\n` +
        `Tech Stack: ${results.techStack.map((t) => t.name).join(", ")}`
      mimeType = "text/plain"
      fileExtension = "txt"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `hackdoc-analysis.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download Complete",
      description: `Analysis has been downloaded as ${fileExtension.toUpperCase()}`,
    })
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{fileName || "Document Analysis"}</h2>
      </div>

      <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadResults("txt")}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Download TXT
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadResults("json")}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Download JSON
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="border-purple-800 text-purple-800 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />Upload Another Document
        </Button>
      </div>

      <ResultsDisplay results={results} activeTab={activeTab} />

      <div className="mt-6">
        <WalletControls />
      </div>
    </div>
  )
}