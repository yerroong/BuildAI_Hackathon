"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DocumentUploaderProps {
  onUpload: (files: FileList | null) => void
}

export default function DocumentUploader({ onUpload }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    onUpload(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="pt-6">
        <div
          className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors ${
            isDragging ? "border-[#6B21A8] bg-[#6B21A8]/10" : "border-zinc-700 hover:border-[#6B21A8]/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
            <FileText size={32} className="text-[#6B21A8]" />
          </div>
          <h3 className="text-xl font-medium mb-2">Upload your document</h3>
          <p className="text-zinc-400 text-center mb-6">Drag and drop your PDF, DOCX, or TXT file here</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".pdf,.docx,.txt"
          />
          <Button
            onClick={handleButtonClick}
            className="bg-[#6B21A8] hover:bg-[#5B1A98] text-white flex items-center gap-2"
          >
            <Upload size={16} />
            Upload Document
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
