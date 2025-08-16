"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  joinedDate: Date
  totalOrders: number
  totalSpent: number
  loyaltyPoints: number
  preferences: {
    notifications: boolean
    newsletter: boolean
    darkMode: boolean
  }
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  updatePreferences: (preferences: Partial<User["preferences"]>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Demo user data
  const demoUser: User = {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    avatar: "/diverse-user-avatars.png",
    joinedDate: new Date("2023-01-15"),
    totalOrders: 12,
    totalSpent: 15420.5,
    loyaltyPoints: 1542,
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
    },
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo, accept any email/password
    if (email && password) {
      setUser(demoUser)
      setIsLoggedIn(true)
      localStorage.setItem("user_data", JSON.stringify(demoUser))
      localStorage.setItem("is_logged_in", "true")
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user_data")
    localStorage.removeItem("is_logged_in")
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
    }
  }

  const updatePreferences = (preferences: Partial<User["preferences"]>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences },
      }
      setUser(updatedUser)
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
    }
  }

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem("user_data")
    const savedLoginStatus = localStorage.getItem("is_logged_in")

    if (savedUser && savedLoginStatus === "true") {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
      }
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        updatePreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
