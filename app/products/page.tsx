"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products, getProductsByCategory, searchProducts, filterProductsByPrice, sortProducts } from "@/lib/products"
import { WalletProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Wallet, Menu, X, ArrowLeft } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

function ProductsPageContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet()
  const { totalItems } = useCart()

  const filteredProducts = useMemo(() => {
    let result = products

    // Apply search
    if (searchQuery) {
      result = searchProducts(searchQuery)
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = getProductsByCategory(selectedCategory)
      if (searchQuery) {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }
    }

    // Apply price filter
    result = filterProductsByPrice(result, priceRange[0], priceRange[1])

    // Apply sorting
    if (sortBy) {
      result = sortProducts(result, sortBy)
    }

    return result
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 1000])
    setSortBy("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b animate-slide-in-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-heading font-bold text-gradient animate-glow">E-commerce App</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                Home
              </Link>
              <Link href="/products" className="text-primary font-medium">
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

              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent hover:scale-105 transition-transform"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-scale-in">
                    {totalItems}
                  </Badge>
                )}
              </Button>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background animate-slide-in-left">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
              >
                Home
              </Link>
              <Link href="/products" className="block px-3 py-2 text-primary font-medium">
                Products
              </Link>
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
              >
                About
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 animate-fade-in-up">
            Product Catalog
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Discover our complete collection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No products found</p>
                <Button onClick={handleClearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <WalletProvider>
      <CartProvider>
        <ProductsPageContent />
      </CartProvider>
    </WalletProvider>
  )
}
