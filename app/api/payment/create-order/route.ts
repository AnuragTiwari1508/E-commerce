import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const Razorpay = require("razorpay")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "INR", orderDetails } = body

    // Create order
    const options = {
      amount: amount, // amount in smallest currency unit (paise for INR)
      currency: currency,
      receipt: `order_${orderDetails.orderId}`,
      notes: {
        order_id: orderDetails.orderId,
        customer_name: orderDetails.customerInfo.name,
        customer_email: orderDetails.customerInfo.email,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      receipt: order.receipt,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
