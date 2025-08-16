"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { Heart, Users, Truck, Shield, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Our Store
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          We are passionate about bringing you the finest products from around the world. 
          Our journey started in 2020 with a simple mission: to make quality shopping accessible to everyone.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            50K+ Happy Customers
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Worldwide Shipping
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            5-Star Rated
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Our Story */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Our Story
            </CardTitle>
            <CardDescription>How it all started</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Founded in 2020 by a team of passionate entrepreneurs, our e-commerce platform was born 
              out of a desire to bridge the gap between quality products and affordable pricing. 
              We started with just 50 products and a dream to revolutionize online shopping.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, we proudly serve over 50,000 customers worldwide, offering everything from 
              fashion and electronics to home essentials and jewelry. Our commitment to quality, 
              customer service, and innovation remains at the heart of everything we do.
            </p>
            <p className="text-muted-foreground">
              Every product in our catalog is carefully selected by our team of experts who 
              travel the world to find the best suppliers and manufacturers.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-500" />
              Our Mission & Values
            </CardTitle>
            <CardDescription>What drives us forward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Quality First</h4>
                <p className="text-sm text-muted-foreground">
                  We believe in offering only the highest quality products that meet our strict standards.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customer Satisfaction</h4>
                <p className="text-sm text-muted-foreground">
                  Your happiness is our success. We go above and beyond to ensure every customer is delighted.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  We constantly innovate our platform and services to provide the best shopping experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sustainability</h4>
                <p className="text-sm text-muted-foreground">
                  We are committed to environmentally responsible practices in all our operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over ₹500. Express delivery available in major cities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Your payment information is protected with bank-level security and encryption.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Our customer support team is available round the clock to help you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <Card className="mb-16">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">AS</span>
              </div>
              <h3 className="font-semibold mb-1">Arjun Sharma</h3>
              <p className="text-sm text-muted-foreground mb-2">CEO & Founder</p>
              <p className="text-xs text-muted-foreground">
                Visionary leader with 10+ years in e-commerce and tech innovation.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">PK</span>
              </div>
              <h3 className="font-semibold mb-1">Priya Kumar</h3>
              <p className="text-sm text-muted-foreground mb-2">Head of Operations</p>
              <p className="text-xs text-muted-foreground">
                Expert in supply chain management and customer experience optimization.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">RG</span>
              </div>
              <h3 className="font-semibold mb-1">Rahul Gupta</h3>
              <p className="text-sm text-muted-foreground mb-2">CTO</p>
              <p className="text-xs text-muted-foreground">
                Technology enthusiast focused on creating seamless user experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground mb-6">
            Discover our amazing collection of products and join thousands of satisfied customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/products">Explore Products</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
