"use client"

import type React from "react"

import { useState } from "react"
import { UploadIcon, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResultsContainer } from "@/components/results-container"
import { ChatInterface } from "@/components/chat-interface"
import { useToast } from "@/components/ui/use-toast"
import { LoadingState } from "@/components/loading-state"

export function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any | null>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    analyzeDocument(selectedFile)
  }

  const analyzeDocument = (file: File) => {
    setIsAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results
      setResults({
        summary:
          "This document outlines a decentralized marketplace for digital assets using blockchain technology. The platform aims to connect creators and collectors in a trustless environment with low fees and high security.",
        techStack: [
          { name: "React", icon: "react" },
          { name: "Solidity", icon: "ethereum" },
          { name: "IPFS", icon: "database" },
          { name: "Polygon", icon: "hexagon" },
          { name: "The Graph", icon: "bar-chart" },
        ],
        keyFeatures: [
          "Wallet-free login with social authentication",
          "Tokenized ownership with ERC-721 standard",
          "Gasless transactions for better UX",
          "Decentralized storage for assets",
          "Multi-chain support",
        ],
        deadline: "MVP target: June 2025",
      })

      setIsAnalyzing(false)
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed.",
      })
    }, 3000)
  }

  const resetUpload = () => {
    setFile(null)
    setResults(null)
  }

  if (results) {
    return (
      <div className="space-y-8">
        <ResultsContainer results={results} fileName={file?.name} onReset={resetUpload} />
        <ChatInterface />
      </div>
    )
  }

  if (isAnalyzing) {
    return <LoadingState fileName={file?.name} onReset={resetUpload} />
  }

  return (
    <div className="flex flex-col items-center">
      <Card
        className={`w-full max-w-2xl p-8 border-2 border-dashed transition-colors shadow-md dark:bg-zinc-900 dark:border-gray-700 ${
          isDragging
            ? "border-purple-800 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <UploadIcon className="h-10 w-10 text-purple-800 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Upload your document</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Drag and drop your file here, or click to browse</p>
          <div className="flex flex-col items-center gap-4">
            <Button
              className="bg-purple-800 hover:bg-purple-900 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <FileText className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500 dark:text-gray-500">Supported formats: PDF, DOCX, TXT</p>
          </div>
        </div>
      </Card>
    </div>
  )
}