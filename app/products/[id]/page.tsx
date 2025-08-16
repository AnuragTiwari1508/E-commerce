"use client"

import { useState, use } from "react"
import { getProductById } from "@/lib/products"
import { WalletProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Wallet, Menu, X, ArrowLeft, Star, Heart, Share2, Minus, Plus } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

function ProductPageContent({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const product = getProductById(resolvedParams.id)

  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet()
  const { addItem, totalItems } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: Object.keys(selectedVariant).length > 0 ? JSON.stringify(selectedVariant) : undefined,
      })
    }
  }

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariant((prev) => ({ ...prev, [type]: value }))
  }

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
                  Back to Products
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

              <CartDrawer>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative bg-transparent hover:scale-105 transition-transform"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-scale-in">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>

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

      {/* Product Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted animate-fade-in-up">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-slide-in-right">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.subcategory && <Badge variant="secondary">{product.subcategory}</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gradient">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                <Badge variant={product.inStock ? "secondary" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4">
                {Object.entries(product.variants).map(([type, options]) => (
                  <div key={type}>
                    <label className="text-sm font-medium mb-2 block capitalize">{type}</label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <Button
                          key={option}
                          variant={selectedVariant[type] === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVariantChange(type, option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 hover:scale-105 transition-transform"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="hover:scale-105 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>

              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform bg-transparent">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  {product.features && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specifications available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    {product.reviewCount} reviews with an average rating of {product.rating} stars
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reviews feature coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <WalletProvider>
      <CartProvider>
        <ProductPageContent params={params} />
      </CartProvider>
    </WalletProvider>
  )
}
