"use client"

import { FileText, Code, Zap, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockResults = {
  summary:
    "This document outlines a decentralized marketplace for digital assets with a focus on user experience and security. The platform aims to connect creators and collectors through a wallet-free login system and tokenized ownership verification.",
  techStack: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Solidity", icon: "solidity" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
  ],
  features: [
    "Wallet-free login system",
    "Tokenized ownership verification",
    "Multi-chain support",
    "Social sharing integration",
    "Creator dashboard with analytics",
  ],
  timeline: [
    { milestone: "Research & Planning", date: "March 2025" },
    { milestone: "MVP Development", date: "June 2025" },
    { milestone: "Beta Testing", date: "August 2025" },
    { milestone: "Public Launch", date: "October 2025" },
  ],
}

export default function ResultsDisplay() {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid grid-cols-4 bg-zinc-900">
        <TabsTrigger value="summary" className="data-[state=active]:bg-zinc-800">
          <FileText size={16} className="mr-2" />
          Summary
        </TabsTrigger>
        <TabsTrigger value="tech-stack" className="data-[state=active]:bg-zinc-800">
          <Code size={16} className="mr-2" />
          Tech Stack
        </TabsTrigger>
        <TabsTrigger value="features" className="data-[state=active]:bg-zinc-800">
          <Zap size={16} className="mr-2" />
          Key Features
        </TabsTrigger>
        <TabsTrigger value="timeline" className="data-[state=active]:bg-zinc-800">
          <Calendar size={16} className="mr-2" />
          Timeline
        </TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="mt-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} className="text-[#6B21A8]" />
              Document Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300 leading-relaxed">{mockResults.summary}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tech-stack" className="mt-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code size={20} className="text-[#6B21A8]" />
              Extracted Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockResults.techStack.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features" className="mt-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} className="text-[#6B21A8]" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockResults.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 min-w-4 text-[#6B21A8]">•</div>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="timeline" className="mt-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-[#6B21A8]" />
              Project Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.timeline.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#6B21A8] font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-200">{item.milestone}</h4>
                    <p className="text-zinc-400 text-sm">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
