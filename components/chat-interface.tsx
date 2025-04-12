"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  role: "user" | "agent"
  content: string
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: "I've analyzed your document. How can I help with your development tasks?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate agent response after a short delay
    setTimeout(() => {
      const responses = [
        'Here\'s a React component for the login page:\n\n```jsx\nfunction LoginPage() {\n  return (\n    <div className="login-container">\n      <h1>Welcome Back</h1>\n      <form>\n        <input type="email" placeholder="Email" />\n        <input type="password" placeholder="Password" />\n        <button type="submit">Sign In</button>\n      </form>\n    </div>\n  );\n}\n```',
        "Based on your document, I recommend using Next.js Auth for the wallet-free login system. This will provide a secure authentication flow while maintaining good UX.",
        "For the tokenized ownership feature, you'll need to implement a smart contract. Here's a simplified Solidity example:\n\n```solidity\ncontract OwnershipToken {\n    mapping(uint256 => address) private _tokenOwners;\n    \n    function mintToken(address to, uint256 tokenId) external {\n        _tokenOwners[tokenId] = to;\n    }\n    \n    function ownerOf(uint256 tokenId) external view returns (address) {\n        return _tokenOwners[tokenId];\n    }\n}\n```",
      ]

      const agentMessage: Message = {
        id: Date.now().toString(),
        role: "agent",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl text-zinc-100">Chat with AI Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: "thin" }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-zinc-700 text-zinc-100" : "bg-[#6B21A8] text-white"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-1 ${message.role === "user" ? "text-zinc-400" : "text-purple-200"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Agent..."
            className="min-h-[60px] bg-zinc-800 border-zinc-700 focus-visible:ring-[#6B21A8]"
          />
          <Button onClick={handleSendMessage} className="bg-[#6B21A8] hover:bg-[#5B1A98] text-white h-[60px] px-4">
            <Send size={20} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
