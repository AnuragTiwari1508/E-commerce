"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "./wallet-provider"
import { Wallet, Send, History, Copy, CheckCircle, Clock, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { isConnected, address, balance, transactions, connectWallet, disconnectWallet, sendTransaction } = useWallet()
  const [sendTo, setSendTo] = useState("")
  const [sendAmount, setSendAmount] = useState("")
  const [sendDescription, setSendDescription] = useState("")
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    await connectWallet()
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected.",
    })
  }

  const handleDisconnect = () => {
    disconnectWallet()
    onOpenChange(false)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const handleSend = async () => {
    if (!sendTo || !sendAmount) return

    setIsSending(true)
    const success = await sendTransaction(sendTo, sendAmount, sendDescription || `Sent ${sendAmount} ETH`)
    setIsSending(false)

    if (success) {
      setSendTo("")
      setSendAmount("")
      setSendDescription("")
      toast({
        title: "Transaction Sent",
        description: `Successfully sent ${sendAmount} ETH`,
      })
    } else {
      toast({
        title: "Transaction Failed",
        description: "Insufficient funds or transaction error",
        variant: "destructive",
      })
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet
          </DialogTitle>
        </DialogHeader>

        {!isConnected ? (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">Connect your wallet to start making transactions</p>
              <Button onClick={handleConnect} className="w-full">
                Connect Wallet
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wallet Balance</CardTitle>
                  <CardDescription>Your current ETH balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">{balance} ETH</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Address:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{formatAddress(address!)}</code>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={handleDisconnect} className="w-full bg-transparent">
                Disconnect Wallet
              </Button>
            </TabsContent>

            <TabsContent value="send" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sendTo">Recipient Address</Label>
                  <Input id="sendTo" placeholder="0x..." value={sendTo} onChange={(e) => setSendTo(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="sendAmount">Amount (ETH)</Label>
                  <Input
                    id="sendAmount"
                    type="number"
                    step="0.0001"
                    placeholder="0.0"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sendDescription">Description (Optional)</Label>
                  <Input
                    id="sendDescription"
                    placeholder="Payment for..."
                    value={sendDescription}
                    onChange={(e) => setSendDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleSend} disabled={!sendTo || !sendAmount || isSending} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {isSending ? "Sending..." : "Send Transaction"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-2" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <Card key={tx.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(tx.status)}
                            <div>
                              <p className="font-medium text-sm">{tx.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${tx.type === "receive" ? "text-green-600" : "text-red-600"}`}>
                              {tx.type === "receive" ? "+" : "-"}
                              {tx.amount} ETH
                            </p>
                            <Badge variant={tx.status === "completed" ? "default" : "secondary"}>{tx.status}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
