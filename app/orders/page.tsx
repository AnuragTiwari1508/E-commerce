"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, Clock, CheckCircle, Truck, XCircle, Eye } from "lucide-react"
import { usePayment } from "@/components/payment-provider"

export default function OrdersPage() {
  const { orders } = usePayment()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4 text-blue-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

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

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "highest":
          return b.total - a.total
        case "lowest":
          return a.total - b.total
        default:
          return 0
      }
    })

  if (!orders.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Orders Yet</h1>
          <p className="text-muted-foreground mb-4">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Button asChild>
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>
                      Placed on {order.createdAt.toLocaleDateString()} • {order.items.length} item(s)
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <Badge variant={getStatusVariant(order.status)} className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items Preview */}
                  <div className="lg:col-span-2">
                    <div className="space-y-3">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} • ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-muted-foreground">
                          +{order.items.length - 2} more item(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-lg font-bold">₹{order.total.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        via {order.paymentMethod}
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Estimated Delivery</span>
                        <span className="font-medium">
                          {order.estimatedDelivery.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <a href={`/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </a>
                      </Button>
                      
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Order Statistics */}
      {filteredOrders.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {filteredOrders.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₹{filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {filteredOrders.filter(o => o.status === "delivered").length}
                </div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {filteredOrders.filter(o => o.status === "shipped").length}
                </div>
                <div className="text-sm text-muted-foreground">In Transit</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
