import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { WalletProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import { PaymentProvider } from "@/components/payment-provider"
import { UserProvider } from "@/components/user-provider"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "E-commerce App - Modern Shopping with Blockchain",
  description: "Revolutionary e-commerce platform with integrated blockchain wallet functionality",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-dm-sans: ${dmSans.variable};
  --font-space-grotesk: ${spaceGrotesk.variable};
  --font-geist-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${GeistMono.variable} antialiased`}>
        <UserProvider>
          <WalletProvider>
            <CartProvider>
              <PaymentProvider>
                {children}
                <Toaster />
              </PaymentProvider>
            </CartProvider>
          </WalletProvider>
        </UserProvider>
      </body>
    </html>
  )
}
