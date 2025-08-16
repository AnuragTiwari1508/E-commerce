"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/components/user-provider"
import { usePayment } from "@/components/payment-provider"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"
import { ShoppingBag, Wallet, Settings, Heart, MapPin, Star, TrendingUp, Package, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoggedIn } = useUser()
  const { orders } = usePayment()
  const { isConnected, balance, transactions } = useWallet()
  const router = useRouter()

  if (!isLoggedIn || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </div>
    )
  }

  const recentOrders = orders.slice(0, 3)
  const recentTransactions = transactions.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Manage your account and track your orders</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">₹{user.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
                  <div className="text-sm text-muted-foreground">Loyalty Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{isConnected ? `${balance} ETH` : "Not Connected"}</div>
                  <div className="text-sm text-muted-foreground">Wallet Balance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>Your latest purchases</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-2" />
                    <p>No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.items.length} items • ₹{order.total.toFixed(2)}
                          </div>
                        </div>
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Orders
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="h-12 w-12 mx-auto mb-2" />
                    <p>Connect your wallet to see transactions</p>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="h-12 w-12 mx-auto mb-2" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-sm text-muted-foreground">{tx.timestamp.toLocaleDateString()}</div>
                        </div>
                        <div className={`font-medium ${tx.type === "receive" ? "text-green-600" : "text-red-600"}`}>
                          {tx.type === "receive" ? "+" : "-"}
                          {tx.amount} ETH
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Transactions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Shop Now</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  <span>Track Order</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Heart className="h-6 w-6" />
                  <span>Wishlist</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Settings className="h-6 w-6" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="mb-4">Start shopping to see your orders here</p>
                  <Button onClick={() => router.push("/products")}>Browse Products</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {order.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {order.items.length} items • Total: ₹{order.total.toFixed(2)}
                          </div>
                          <Button variant="outline" size="sm" onClick={() => router.push(`/orders/${order.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Overview</CardTitle>
              <CardDescription>Manage your crypto wallet</CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="text-center py-12">
                  <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Wallet not connected</h3>
                  <p className="text-muted-foreground mb-4">Connect your wallet to manage your crypto assets</p>
                  <Button>Connect Wallet</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{balance} ETH</div>
                    <div className="text-muted-foreground">Current Balance</div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Transactions</h4>
                    {transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.timestamp.toLocaleDateString()} • {tx.status}
                          </div>
                        </div>
                        <div className={`font-medium ${tx.type === "receive" ? "text-green-600" : "text-red-600"}`}>
                          {tx.type === "receive" ? "+" : "-"}
                          {tx.amount} ETH
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Items you want to buy later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                <p className="mb-4">Save items you love to buy them later</p>
                <Button onClick={() => router.push("/products")}>Browse Products</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your delivery addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
                <p className="mb-4">Add addresses for faster checkout</p>
                <Button>Add Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Profile Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Name</span>
                      <span className="text-muted-foreground">{user.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email</span>
                      <span className="text-muted-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phone</span>
                      <span className="text-muted-foreground">{user.phone || "Not provided"}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Edit Profile
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Badge variant={user.preferences.notifications ? "default" : "secondary"}>
                        {user.preferences.notifications ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Newsletter</span>
                      <Badge variant={user.preferences.newsletter ? "default" : "secondary"}>
                        {user.preferences.newsletter ? "Subscribed" : "Unsubscribed"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Update Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
