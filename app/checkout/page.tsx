"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RazorpayCheckout } from "@/components/payment/razorpay-checkout"
import { AddressMap } from "@/components/address-map"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Truck, MapPin, User, Mail, Phone, CreditCard, Package } from "lucide-react"

interface ShippingInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const shippingCost = totalPrice > 500 ? 0 : 99
  const taxAmount = Math.round(totalPrice * 0.18) // 18% GST
  const finalTotal = totalPrice + shippingCost + taxAmount

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate shipping info
    const requiredFields: (keyof ShippingInfo)[] = [
      'fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'
    ]
    
    const missingFields = requiredFields.filter(field => !shippingInfo[field])
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(shippingInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(shippingInfo.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      })
      return
    }

    setCurrentStep(2)
  }

  const handlePaymentSuccess = (response: any) => {
    toast({
      title: "Order Placed Successfully!",
      description: `Payment ID: ${response.razorpay_payment_id}`,
    })
    
    clearCart()
    router.push(`/orders/${response.razorpay_order_id}`)
  }

  const handlePaymentFailure = (error: any) => {
    console.error("Payment failed:", error)
    toast({
      title: "Payment Failed",
      description: "Please try again or contact support.",
      variant: "destructive",
    })
  }

  const orderDetails = {
    orderId: `ORDER_${Date.now()}`,
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    customerInfo: {
      name: shippingInfo.fullName,
      email: shippingInfo.email,
      phone: shippingInfo.phone,
    },
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-4">Add some items to your cart to continue</p>
        <Button asChild>
          <a href="/products">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`rounded-full p-2 ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <Truck className="h-4 w-4" />
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className={`h-px flex-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`} />
          <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`rounded-full p-2 ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <CreditCard className="h-4 w-4" />
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
                <CardDescription>
                  Please provide your shipping details for delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        <User className="h-4 w-4 inline mr-1" />
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      placeholder="Enter your complete address"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Interactive Map for Address Selection */}
                  <div className="space-y-2">
                    <Label>Select Location on Map</Label>
                    <p className="text-sm text-muted-foreground">
                      Click on the map to automatically fill address details
                    </p>
                    <div className="rounded-lg border overflow-hidden">
                      <AddressMap
                        onAddressSelect={(address) => {
                          setShippingInfo({
                            ...shippingInfo,
                            address: address.formattedAddress || '',
                            city: address.city || '',
                            state: address.state || '',
                            zipCode: address.zipCode || '',
                          })
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                        placeholder="ZIP Code"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{shippingInfo.fullName}</p>
                    <p className="text-sm text-muted-foreground">{shippingInfo.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📧 {shippingInfo.email} | 📞 {shippingInfo.phone}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit Address
                  </Button>
                </CardContent>
              </Card>

              <RazorpayCheckout
                amount={finalTotal}
                currency="INR"
                orderDetails={orderDetails}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant || ''}`} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">{item.name}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        {item.variant && <Badge variant="outline" className="text-xs">{item.variant}</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Shipping
                    {totalPrice > 500 && (
                      <Badge variant="secondary" className="text-xs">FREE</Badge>
                    )}
                  </span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {totalPrice <= 500 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    💡 Add ₹{(500 - totalPrice).toLocaleString()} more to get free shipping!
                  </p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Fast Delivery</p>
                    <p className="text-xs text-green-600">Get it by tomorrow if you order within 2 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
