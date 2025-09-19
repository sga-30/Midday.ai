"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import { ArrowRight, Mail, Github, Check, AlertCircle } from "lucide-react"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: `${formData.firstName} ${formData.lastName}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/dashboard")
      } else {
        setError(data.error || "Sign up failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <Navigation />

      <main className="max-w-md mx-auto px-6 pt-20 pb-32">
        <Card className="border-gray-200/50 bg-white/90 dark:bg-gray-800/90 dark:border-gray-700 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-light text-gray-900 dark:text-gray-100">
              Create your account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Start your 30-day free trial today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-200">30-day free trial</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-200">No credit card required</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-200">Cancel anytime</span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full py-3 rounded-full border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                onClick={() => alert("GitHub auth not yet implemented")}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full py-3 rounded-full border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                onClick={() => alert("Google auth not yet implemented")}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters with letters and numbers
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-gray-900 dark:text-gray-100 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-gray-900 dark:text-gray-100 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

