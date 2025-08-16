"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Chrome, Mail, Lock, User, ArrowRight, UserPlus } from "lucide-react"
import { useUser } from "@/components/user-provider"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      // For demo purposes, simulate Google login
      setTimeout(() => {
        login({
          id: "google_user_123",
          name: "Google User",
          email: "user@gmail.com",
          avatar: "https://lh3.googleusercontent.com/a/default-user",
        })
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in with Google",
        })
        
        router.push("/")
        setIsGoogleLoading(false)
      }, 1500)
    } catch (error) {
      toast({
        title: "Sign-in Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsGoogleLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email login (you can implement actual authentication here)
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        login({
          id: loginData.email,
          name: loginData.email.split("@")[0],
          email: loginData.email,
          avatar: "",
        })
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged in as ${loginData.email}`,
        })
        
        router.push("/")
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegisterLoading(true)

    // Validate password confirmation
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      setIsRegisterLoading(false)
      return
    }

    // Simulate registration (you can implement actual registration here)
    setTimeout(() => {
      if (registerData.name && registerData.email && registerData.password) {
        login({
          id: registerData.email,
          name: registerData.name,
          email: registerData.email,
          avatar: "",
        })
        
        toast({
          title: "Account Created!",
          description: `Welcome to E-commerce App, ${registerData.name}!`,
        })
        
        router.push("/")
      } else {
        toast({
          title: "Registration Failed",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
      }
      setIsRegisterLoading(false)
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to E-commerce</h1>
            <p className="text-muted-foreground">Sign in to your account or create a new one</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Google Sign In */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                    ) : (
                      <Chrome className="mr-2 h-4 w-4" />
                    )}
                    Sign in with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Email Login Form */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">
                        <Lock className="h-4 w-4 inline mr-1" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  {/* Demo Credentials */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Email: demo@example.com</p>
                      <p>Password: password123</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join us today and start your shopping journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Google Sign Up */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                    ) : (
                      <Chrome className="mr-2 h-4 w-4" />
                    )}
                    Sign up with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or register with</span>
                    </div>
                  </div>

                  {/* Registration Form */}
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">
                        <User className="h-4 w-4 inline mr-1" />
                        Full Name
                      </Label>
                      <Input
                        id="register-name"
                        type="text"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">
                        <Lock className="h-4 w-4 inline mr-1" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          placeholder="Create a password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">
                        <Lock className="h-4 w-4 inline mr-1" />
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          placeholder="Confirm your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                      {isRegisterLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
