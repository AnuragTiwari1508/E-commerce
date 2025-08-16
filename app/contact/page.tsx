"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react"

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          We'd love to hear from you! Whether you have questions, feedback, or need support, 
          our team is here to help you 24/7.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            24/7 Support
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            Quick Response
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Headphones className="w-4 h-4 mr-2" />
            Expert Help
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-500" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-500" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Visit Our Office</p>
                  <p className="text-sm text-muted-foreground">
                    123 Business District<br />
                    Sector 62, Noida<br />
                    Uttar Pradesh 201301, India
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">
                    +91 9876543210<br />
                    +91 1234567890
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon-Sun: 9:00 AM - 9:00 PM (IST)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">
                    support@yourstore.com<br />
                    business@yourstore.com
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We respond within 2-4 hours
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Follow Us</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Instagram className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-6 h-6 text-blue-500" />
                Quick Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-1">Order Issues</h4>
                <p className="text-sm text-blue-600">
                  Having trouble with your order? We're here to help!
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Chat with Support
                </Button>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-1">Returns & Refunds</h4>
                <p className="text-sm text-green-600">
                  Need to return an item? Quick and easy process.
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Start Return
                </Button>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-1">Technical Help</h4>
                <p className="text-sm text-purple-600">
                  Website issues? Our tech team is standing by.
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Get Tech Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions. Can't find what you're looking for? Contact us!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How long does shipping take?</h4>
                <p className="text-sm text-muted-foreground">
                  Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in major cities.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What is your return policy?</h4>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day return policy for all items in original condition. Free returns on orders over ₹1000.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Do you offer international shipping?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! We ship to over 50 countries worldwide. Shipping costs vary by location.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How can I track my order?</h4>
                <p className="text-sm text-muted-foreground">
                  Once your order ships, you'll receive a tracking number via email. You can also track orders in your account.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, debit cards, UPI, net banking, and digital wallets.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is my personal information secure?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! We use bank-level encryption to protect your data and never share personal information.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
