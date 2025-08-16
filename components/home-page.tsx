"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ArrowRight, Shield, Sparkles } from "lucide-react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Show only first 6 products on homepage
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient animate-background-shift"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            >
              Revolutionary E-commerce with <span className="text-gradient animate-shimmer">Blockchain</span>
            </h1>
            <p
              className={`text-xl text-muted-foreground mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Experience the future of online shopping with integrated wallet functionality, secure payments, and
              seamless blockchain transactions.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/products">
                <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform animate-glow">
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 animate-fade-in-up">
              Featured Products
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Discover our curated collection of premium products, all available for purchase with traditional or crypto
              payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float"></div>
          <div
            className="absolute top-20 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-10 left-1/3 w-28 h-28 bg-accent/5 rounded-full animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 animate-fade-in-up">
              Why Choose E-commerce App?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center card-hover-effect animate-slide-in-left">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Blockchain Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly connect your crypto wallet and pay with digital currencies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover-effect animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Advanced security measures protect your transactions and personal data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover-effect animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Curated selection of high-quality products from trusted vendors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Products</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 animate-fade-in-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-heading font-bold mb-4">E-commerce App</h3>
              <p className="text-background/80">Revolutionary e-commerce platform with blockchain integration.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <Link href="/products" className="hover:text-background transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-background/80 mb-4">Stay updated with our latest products and offers.</p>
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2025 E-commerce App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
