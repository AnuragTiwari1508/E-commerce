"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useWallet } from "@/components/wallet-provider"
import { useUser } from "@/components/user-provider"
import { WalletModal } from "@/components/wallet-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, Wallet, User, LogOut, Settings, Package } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const { totalItems } = useCart()
  const { isConnected, address } = useWallet()
  const { user, isLoggedIn, logout } = useUser()
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <span className="font-bold text-xl font-space-grotesk">E-commerce App</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWalletModalOpen(true)}
                className="hidden sm:flex bg-transparent"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnected ? formatAddress(address!) : "Connect"}
              </Button>

              {/* Cart Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/cart")}
                className="relative bg-transparent"
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")}>
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" onClick={() => router.push("/login")}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  )
}
