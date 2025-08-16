"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Wallet, Menu, X, ArrowLeft, Plus, Minus, Trash2, Tag } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useCart } from "@/components/cart-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import Link from "next/link"

function CartPageContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet()
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
    } else {
      setAppliedPromo(null)
    }
  }

  const discount = appliedPromo === "SAVE10" ? totalPrice * 0.1 : 0
  const tax = (totalPrice - discount) * 0.08
  const finalTotal = totalPrice - discount + tax

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b animate-slide-in-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <h1 className="text-2xl font-heading font-bold text-gradient animate-glow">E-commerce App</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Products
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                About
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                Contact
              </a>
            </div>

            {/* Wallet & Cart */}
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2 animate-scale-in">
                  <Badge variant="secondary" className="animate-pulse-glow">
                    <Wallet className="w-3 h-3 mr-1" />
                    {balance} ETH
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                    className="hover:scale-105 transition-transform bg-transparent"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  size="sm"
                  className="animate-fade-in-up hover:scale-105 transition-transform"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}

              <Badge variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({totalItems})
              </Badge>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:scale-105 transition-transform"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 animate-fade-in-up">
            Shopping Cart
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Review your items and proceed to checkout
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Link href="/products">
              <Button size="lg" className="hover:scale-105 transition-transform">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold">Cart Items ({totalItems})</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {items.map((item, index) => (
                <Card
                  key={`${item.id}-${item.variant || ""}`}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                            {item.variant && <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">${item.price} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-slide-in-right">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" size="sm" onClick={handleApplyPromo}>
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="text-sm text-green-600">✓ Promo code "{appliedPromo}" applied!</div>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedPromo})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/checkout">
                      <Button className="w-full hover:scale-105 transition-transform">Proceed to Checkout</Button>
                    </Link>

                    <Link href="/products">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div className="text-center pt-4">
                    <div className="text-xs text-muted-foreground">🔒 Secure checkout with SSL encryption</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <WalletProvider>
      <CartProvider>
        <CartPageContent />
      </CartProvider>
    </WalletProvider>
  )
}
