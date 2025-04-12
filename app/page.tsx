"use client"

import { useState } from "react"
import { Upload, Download, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import DocumentUploader from "@/components/document-uploader"
import LoadingState from "@/components/loading-state"
import ResultsDisplay from "@/components/results-display"
import ChatInterface from "@/components/chat-interface"

export default function Home() {
  const [documentState, setDocumentState] = useState<"idle" | "loading" | "analyzed">("idle")
  const [walletConnected, setWalletConnected] = useState(false)

  const handleUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      setDocumentState("loading")

      // Simulate document analysis
      setTimeout(() => {
        setDocumentState("analyzed")
      }, 3000)
    }
  }

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  const handleUploadAnother = () => {
    setDocumentState("idle")
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B21A8] mb-2">HackDocs</h1>
          <p className="text-lg text-zinc-400">AI-powered Document Assistant for Developers</p>
        </header>

        {documentState === "idle" && <DocumentUploader onUpload={handleUpload} />}

        {documentState === "loading" && <LoadingState />}

        {documentState === "analyzed" && (
          <div className="space-y-8">
            <ResultsDisplay />

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Download .txt
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Download .json
                </Button>
                <Button variant="outline" onClick={handleUploadAnother} className="flex items-center gap-2">
                  <Upload size={16} />
                  Upload Another Document
                </Button>
              </div>

              <div className="flex gap-3">
                {!walletConnected ? (
                  <Button
                    onClick={handleConnectWallet}
                    className="bg-[#6B21A8] hover:bg-[#5B1A98] text-white flex items-center gap-2"
                  >
                    <Wallet size={16} />
                    Connect Wallet
                  </Button>
                ) : (
                  <Button
                    className="bg-[#6B21A8] hover:bg-[#5B1A98] text-white flex items-center gap-2"
                    disabled={!walletConnected}
                  >
                    Register Agent on-chain
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-8 bg-zinc-800" />

            <ChatInterface />
          </div>
        )}
      </div>
    </main>
  )
}
