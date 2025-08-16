"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface PaymentMethod {
  id: string
  type: "card" | "wallet" | "upi" | "netbanking"
  name: string
  details: string
  isDefault?: boolean
}

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  shippingAddress: Address
  createdAt: Date
  estimatedDelivery: Date
}

interface Address {
  id?: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault?: boolean
}

interface PaymentContextType {
  paymentMethods: PaymentMethod[]
  orders: Order[]
  addresses: Address[]
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (id: string) => void
  addAddress: (address: Omit<Address, "id">) => void
  removeAddress: (id: string) => void
  processPayment: (
    items: any[],
    paymentMethodId: string,
    addressId: string,
    promoCode?: string,
  ) => Promise<{ success: boolean; orderId?: string; error?: string }>
  getOrder: (orderId: string) => Order | undefined
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "**** **** **** 4242",
      isDefault: true,
    },
    {
      id: "2",
      type: "wallet",
      name: "Crypto Wallet",
      details: "0x742d...8f3a",
    },
    {
      id: "3",
      type: "upi",
      name: "UPI",
      details: "user@paytm",
    },
  ])

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+91 9876543210",
      addressLine1: "123 Main Street",
      addressLine2: "Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
      isDefault: true,
    },
  ])

  const [orders, setOrders] = useState<Order[]>([])

  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod = {
      ...method,
      id: Date.now().toString(),
    }
    setPaymentMethods((prev) => [...prev, newMethod])
  }

  const removePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
  }

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    }
    setAddresses((prev) => [...prev, newAddress])
  }

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id))
  }

  const processPayment = async (
    items: any[],
    paymentMethodId: string,
    addressId: string,
    promoCode?: string,
  ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const paymentMethod = paymentMethods.find((pm) => pm.id === paymentMethodId)
      const shippingAddress = addresses.find((addr) => addr.id === addressId)

      if (!paymentMethod || !shippingAddress) {
        return { success: false, error: "Invalid payment method or address" }
      }

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.18 // 18% GST
      const shipping = subtotal > 500 ? 0 : 50 // Free shipping above ₹500
      let discount = 0

      // Apply promo code
      if (promoCode) {
        switch (promoCode.toUpperCase()) {
          case "SAVE10":
            discount = subtotal * 0.1
            break
          case "FIRST20":
            discount = subtotal * 0.2
            break
          case "CRYPTO15":
            if (paymentMethod.type === "wallet") {
              discount = subtotal * 0.15
            }
            break
        }
      }

      const total = subtotal + tax + shipping - discount

      // Simulate payment failure for demo (5% chance)
      if (Math.random() < 0.05) {
        return { success: false, error: "Payment failed. Please try again." }
      }

      // Create order
      const orderId = `ORD-${Date.now()}`
      const newOrder: Order = {
        id: orderId,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        tax,
        shipping,
        discount,
        total,
        status: "processing",
        paymentMethod: paymentMethod.name,
        shippingAddress,
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      }

      setOrders((prev) => [newOrder, ...prev])

      return { success: true, orderId }
    } catch (error) {
      return { success: false, error: "Payment processing failed" }
    }
  }

  const getOrder = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        orders,
        addresses,
        addPaymentMethod,
        removePaymentMethod,
        addAddress,
        removeAddress,
        processPayment,
        getOrder,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}
