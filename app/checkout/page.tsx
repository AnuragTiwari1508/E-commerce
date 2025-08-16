"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { usePayment } from "@/components/payment-provider"
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Wallet, Smartphone, Building, Plus, MapPin, Phone } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { paymentMethods, addresses, processPayment } = usePayment()
  const { isConnected, balance } = useWallet()
  const { toast } = useToast()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]?.id || "")
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || "")
  const [promoCode, setPromoCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = totalPrice
  const tax = subtotal * 0.18
  const shipping = subtotal > 500 ? 0 : 50
  let discount = 0

  // Apply promo code discount
  if (promoCode) {
    switch (promoCode.toUpperCase()) {
      case "SAVE10":
        discount = subtotal * 0.1
        break
      case "FIRST20":
        discount = subtotal * 0.2
        break
      case "CRYPTO15":
        const selectedMethod = paymentMethods.find((pm) => pm.id === selectedPaymentMethod)
        if (selectedMethod?.type === "wallet") {
          discount = subtotal * 0.15
        }
        break
    }
  }

  const total = subtotal + tax + shipping - discount

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "wallet":
        return <Wallet className="h-4 w-4" />
      case "upi":
        return <Smartphone className="h-4 w-4" />
      case "netbanking":
        return <Building className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout",
        variant: "destructive",
      })
      return
    }

    if (!selectedPaymentMethod || !selectedAddress) {
      toast({
        title: "Missing information",
        description: "Please select a payment method and address",
        variant: "destructive",
      })
      return
    }

    // Check wallet balance for crypto payments
    const selectedMethod = paymentMethods.find((pm) => pm.id === selectedPaymentMethod)
    if (selectedMethod?.type === "wallet") {
      if (!isConnected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to pay with crypto",
          variant: "destructive",
        })
        return
      }

      const ethTotal = total / 2000 // Assuming 1 ETH = ₹2000 for demo
      if (Number.parseFloat(balance) < ethTotal) {
        toast({
          title: "Insufficient balance",
          description: `You need ${ethTotal.toFixed(4)} ETH but only have ${balance} ETH`,
          variant: "destructive",
        })
        return
      }
    }

    setIsProcessing(true)

    try {
      const result = await processPayment(items, selectedPaymentMethod, selectedAddress, promoCode)

      if (result.success) {
        clearCart()
        toast({
          title: "Order placed successfully!",
          description: `Order ID: ${result.orderId}`,
        })
        router.push(`/orders/${result.orderId}`)
      } else {
        toast({
          title: "Payment failed",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-start space-x-2">
                    <RadioGroupItem value={address.id!} id={address.id} className="mt-1" />
                    <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {address.phone}
                          </div>
                          <div>{address.addressLine1}</div>
                          {address.addressLine2 && <div>{address.addressLine2}</div>}
                          <div>
                            {address.city}, {address.state} {address.pincode}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button variant="outline" className="mt-4 w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                      {getPaymentIcon(method.type)}
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.details}</div>
                      </div>
                      {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button variant="outline" className="mt-4 w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle>Promo Code</CardTitle>
              <CardDescription>Enter a promo code to get discount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Try: SAVE10, FIRST20, CRYPTO15 (for wallet payments)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} disabled={isProcessing} className="w-full" size="lg">
                {isProcessing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
