"use client"

import { FileText, Layers, PuzzleIcon as PuzzlePiece, Calendar } from "lucide-react"

interface SectionTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SectionTabs({ activeTab, onTabChange }: SectionTabsProps) {
  const tabs = [
    { id: "summary", label: "📄 Summary", icon: <FileText className="h-4 w-4" /> },
    { id: "techStack", label: "🧱 Tech Stack", icon: <Layers className="h-4 w-4" /> },
    { id: "keyFeatures", label: "🧩 Key Features", icon: <PuzzlePiece className="h-4 w-4" /> },
    { id: "timeline", label: "📆 Project Timeline", icon: <Calendar className="h-4 w-4" /> },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-purple-800 text-white dark:bg-purple-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
          }`}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          <span className="mr-1">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
