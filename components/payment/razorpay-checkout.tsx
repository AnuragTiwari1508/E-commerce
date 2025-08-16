"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Wallet, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutProps {
  amount: number
  currency?: string
  orderDetails: {
    orderId: string
    items: Array<{
      id: string
      name: string
      price: number
      quantity: number
    }>
    customerInfo: {
      name: string
      email: string
      phone: string
    }
  }
  onSuccess?: (response: any) => void
  onFailure?: (error: any) => void
}

export function RazorpayCheckout({
  amount,
  currency = "INR",
  orderDetails,
  onSuccess,
  onFailure
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "crypto" | "wallet">("razorpay")
  const { toast } = useToast()

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      
      if (!scriptLoaded) {
        toast({
          title: "Payment Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        })
        return
      }

      // Create order on backend
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency,
          orderDetails,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const order = await response.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DhanSetu E-Commerce",
        description: `Order #${orderDetails.orderId}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch("/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails,
              }),
            })

            if (verifyResponse.ok) {
              toast({
                title: "Payment Successful!",
                description: "Your order has been placed successfully.",
              })
              onSuccess?.(response)
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support for assistance.",
              variant: "destructive",
            })
            onFailure?.(error)
          }
        },
        prefill: {
          name: orderDetails.customerInfo.name,
          email: orderDetails.customerInfo.email,
          contact: orderDetails.customerInfo.phone,
        },
        notes: {
          order_id: orderDetails.orderId,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You can continue shopping and pay later.",
            })
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
      
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      onFailure?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCryptoPayment = async () => {
    setLoading(true)
    
    try {
      // Integrate with Web3/Crypto payment
      toast({
        title: "Crypto Payment",
        description: "Crypto payment integration coming soon!",
      })
    } catch (error) {
      toast({
        title: "Crypto Payment Error",
        description: "Failed to initialize crypto payment.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleWalletPayment = async () => {
    setLoading(true)
    
    try {
      // Integrate with digital wallet
      toast({
        title: "Wallet Payment",
        description: "Digital wallet integration coming soon!",
      })
    } catch (error) {
      toast({
        title: "Wallet Payment Error",
        description: "Failed to initialize wallet payment.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
        <CardDescription>
          Choose your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              paymentMethod === "razorpay"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setPaymentMethod("razorpay")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">Cards & UPI</span>
              </div>
              <Badge variant="secondary">Recommended</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Credit/Debit Cards, UPI, Net Banking
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              paymentMethod === "crypto"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setPaymentMethod("crypto")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="font-medium">Cryptocurrency</span>
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Bitcoin, Ethereum, USDT
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              paymentMethod === "wallet"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="font-medium">Digital Wallet</span>
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Paytm, Google Pay, PhonePe
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold">
              {currency} {amount.toLocaleString()}
            </span>
          </div>

          {paymentMethod === "razorpay" && (
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Securely
                </>
              )}
            </Button>
          )}

          {paymentMethod === "crypto" && (
            <Button
              onClick={handleCryptoPayment}
              disabled={loading}
              className="w-full"
              size="lg"
              variant="outline"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Pay with Crypto
                </>
              )}
            </Button>
          )}

          {paymentMethod === "wallet" && (
            <Button
              onClick={handleWalletPayment}
              disabled={loading}
              className="w-full"
              size="lg"
              variant="outline"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Smartphone className="mr-2 h-4 w-4" />
                  Pay with Wallet
                </>
              )}
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center">
          🔒 Your payment information is secure and encrypted
        </div>
      </CardContent>
    </Card>
  )
}
