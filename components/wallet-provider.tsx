"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Transaction {
  id: string
  type: "send" | "receive" | "purchase"
  amount: string
  timestamp: Date
  description: string
  status: "pending" | "completed" | "failed"
}

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string
  transactions: Transaction[]
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  generateWallet: () => Promise<void>
  sendTransaction: (to: string, amount: string, description: string) => Promise<boolean>
  addTransaction: (transaction: Omit<Transaction, "id" | "timestamp">) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState("0.00")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const generateRandomAddress = () => {
    const chars = "0123456789abcdef"
    let result = "0x"
    for (let i = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateRandomBalance = () => {
    return (Math.random() * 10 + 0.1).toFixed(4)
  }

  const generateSampleTransactions = (): Transaction[] => {
    return [
      {
        id: "1",
        type: "receive",
        amount: "2.5",
        timestamp: new Date(Date.now() - 86400000),
        description: "Received ETH",
        status: "completed",
      },
      {
        id: "2",
        type: "purchase",
        amount: "0.8",
        timestamp: new Date(Date.now() - 43200000),
        description: "Purchased Men's Casual Shirt",
        status: "completed",
      },
      {
        id: "3",
        type: "send",
        amount: "1.2",
        timestamp: new Date(Date.now() - 21600000),
        description: "Sent to 0x742d...8f3a",
        status: "pending",
      },
    ]
  }

  const connectWallet = async () => {
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newAddress = generateRandomAddress()
    const newBalance = generateRandomBalance()
    const sampleTransactions = generateSampleTransactions()

    setAddress(newAddress)
    setBalance(newBalance)
    setTransactions(sampleTransactions)
    setIsConnected(true)

    // Store in localStorage for persistence
    localStorage.setItem("wallet_address", newAddress)
    localStorage.setItem("wallet_balance", newBalance)
    localStorage.setItem("wallet_transactions", JSON.stringify(sampleTransactions))
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance("0.00")
    setTransactions([])
    localStorage.removeItem("wallet_address")
    localStorage.removeItem("wallet_balance")
    localStorage.removeItem("wallet_transactions")
  }

  const generateWallet = async () => {
    // Generate new wallet
    await connectWallet()
  }

  const sendTransaction = async (to: string, amount: string, description: string): Promise<boolean> => {
    try {
      // Simulate transaction processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const currentBalance = Number.parseFloat(balance)
      const sendAmount = Number.parseFloat(amount)

      if (sendAmount > currentBalance) {
        return false // Insufficient funds
      }

      // Update balance
      const newBalance = (currentBalance - sendAmount).toFixed(4)
      setBalance(newBalance)
      localStorage.setItem("wallet_balance", newBalance)

      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "send",
        amount,
        timestamp: new Date(),
        description,
        status: "completed",
      }

      const updatedTransactions = [newTransaction, ...transactions]
      setTransactions(updatedTransactions)
      localStorage.setItem("wallet_transactions", JSON.stringify(updatedTransactions))

      return true
    } catch (error) {
      return false
    }
  }

  const addTransaction = (transaction: Omit<Transaction, "id" | "timestamp">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    const updatedTransactions = [newTransaction, ...transactions]
    setTransactions(updatedTransactions)
    localStorage.setItem("wallet_transactions", JSON.stringify(updatedTransactions))

    // Update balance for purchases
    if (transaction.type === "purchase") {
      const currentBalance = Number.parseFloat(balance)
      const purchaseAmount = Number.parseFloat(transaction.amount)
      const newBalance = Math.max(0, currentBalance - purchaseAmount).toFixed(4)
      setBalance(newBalance)
      localStorage.setItem("wallet_balance", newBalance)
    }
  }

  useEffect(() => {
    // Check for existing wallet connection
    const savedAddress = localStorage.getItem("wallet_address")
    const savedBalance = localStorage.getItem("wallet_balance")
    const savedTransactions = localStorage.getItem("wallet_transactions")

    if (savedAddress && savedBalance) {
      setAddress(savedAddress)
      setBalance(savedBalance)
      setIsConnected(true)

      if (savedTransactions) {
        try {
          const parsedTransactions = JSON.parse(savedTransactions).map((tx: any) => ({
            ...tx,
            timestamp: new Date(tx.timestamp)
          }))
          setTransactions(parsedTransactions)
        } catch (error) {
          console.error("Error parsing saved transactions:", error)
        }
      }
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        transactions,
        connectWallet,
        disconnectWallet,
        generateWallet,
        sendTransaction,
        addTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
