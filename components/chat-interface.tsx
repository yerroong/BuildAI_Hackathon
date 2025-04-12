"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  content: string;
  sender: "user" | "agent";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm the HackDoc Agent. Ask me anything about your document.",
      sender: "agent",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      let response = "";
      if (input.toLowerCase().includes("login page")) {
        response =
          "Based on your document, I can help create a login page with social authentication and wallet-free login. Would you like me to generate some code for that?";
      } else if (input.toLowerCase().includes("architecture")) {
        response =
          "The architecture outlined in your document uses React for the frontend, Solidity smart contracts on Polygon for the backend, IPFS for decentralized storage, and The Graph for indexing. It follows a typical Web3 pattern with client-side wallet integration.";
      } else {
        response =
          "I've analyzed your document and can help with that. What specific details would you like to know?";
      }

      const agentMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: "agent",
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 shadow-md border-gray-200 dark:bg-zinc-900 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-400">
        🤖 Chat with HackDoc Agent
      </h3>
      <ScrollArea className="h-[300px] mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                    : "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          placeholder="Ask a question about your document..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-gray-300 dark:border-gray-600 dark:bg-zinc-800 dark:text-white"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-purple-800 hover:bg-purple-900 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          <Send className="h-4 w-4 mr-2" />
          Ask Agent
        </Button>
      </div>
    </Card>
  );
}
