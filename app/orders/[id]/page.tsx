"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, FileText, Star } from "lucide-react"
import { usePayment } from "@/components/payment-provider"

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle }
]

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrder } = usePayment()
  const orderId = params.id as string
  const [loading, setLoading] = useState(true)

  const order = getOrder(orderId)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-4">We couldn't find an order with that ID.</p>
        <Button onClick={() => router.push("/orders")}>
          View All Orders
        </Button>
      </div>
    )
  }

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status)
  const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / statusSteps.length) * 100 : 0

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered": return "default"
      case "shipped": return "secondary"
      case "processing": return "outline"
      case "confirmed": return "outline"
      case "pending": return "outline"
      case "cancelled": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
        <p className="text-muted-foreground">Order ID: {order.id}</p>
      </div>

      {/* Order Status Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order Status</span>
            <Badge variant={getStatusVariant(order.status)} className="capitalize">
              {order.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            Placed on {order.createdAt.toLocaleDateString()} • 
            Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Progress value={progress} className="w-full" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                const Icon = step.icon

                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div className={`rounded-full p-3 mb-2 ${
                      isCompleted 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-sm font-medium ${
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-blue-500" />
                        <span className="text-xs text-blue-500">In Progress</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {order.status === "shipped" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Tracking Number</p>
                    <p className="text-blue-600 font-mono">TRK{order.id.slice(-8)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">4.5</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Payment Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-sm text-muted-foreground">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="text-sm text-muted-foreground">📞 {order.shippingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant="default">Paid</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex-1">
              Need Help?
            </Button>
          </div>

          {order.status === "delivered" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  How was your shopping experience? Your feedback helps us improve.
                </p>
                <Button className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Leave a Review
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
