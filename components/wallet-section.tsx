"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, Database } from "lucide-react"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function WalletSection() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { toast } = useToast()

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true)
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
    }, 1000)
  }

  const handleRegisterAgent = () => {
    // Simulate registration
    toast({
      title: "Agent Registration",
      description: "Your AI agent is being registered on-chain. This may take a few moments.",
      action: <ToastAction altText="View">View Transaction</ToastAction>,
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 shadow-md border-gray-200 dark:bg-zinc-900 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Web3 Integration</h3>
      <div className="flex flex-wrap gap-4">
        {!isWalletConnected ? (
          <Button
            className="bg-purple-800 hover:bg-purple-900 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
            onClick={handleConnectWallet}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/20"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Wallet Connected
            </Button>
            <Button
              className="bg-purple-800 hover:bg-purple-900 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
              onClick={handleRegisterAgent}
            >
              <Database className="mr-2 h-4 w-4" />
              Register Agent on-chain
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
