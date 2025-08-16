"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className="card-hover-effect group animate-fade-in-up cursor-pointer"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="p-0 relative">
          <div className="aspect-square overflow-hidden rounded-t-lg relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleWishlist}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>

            {/* Sale Badge */}
            {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant={product.inStock ? "secondary" : "destructive"} className="animate-scale-in">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <div className="flex items-center animate-slide-in-right">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
            </div>
          </div>

          <CardTitle className="text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>

          <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full hover:scale-105 transition-transform"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
