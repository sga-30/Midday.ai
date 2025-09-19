"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function GitHubCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Processing...")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      setStatus("Authentication failed. Redirecting...")
      setTimeout(() => router.push("/auth/signin"), 2000)
      return
    }

    if (code) {
      const processGitHubAuth = async () => {
        try {
          // In a real app, exchange code for access token
          const mockUser = {
            id: "github_" + Math.random().toString(36).substr(2, 9),
            email: "user@github.com",
            name: "GitHub User",
            provider: "github",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=github",
          }

          const mockToken = `github_token_${Date.now()}`

          // Store auth data
          localStorage.setItem("auth_token", mockToken)
          localStorage.setItem("user_data", JSON.stringify(mockUser))

          setStatus("Authentication successful! Redirecting to dashboard...")
          setTimeout(() => router.push("/dashboard"), 1500)
        } catch (error) {
          setStatus("Authentication failed. Redirecting...")
          setTimeout(() => router.push("/auth/signin"), 2000)
        }
      }

      processGitHubAuth()
    } else {
      setStatus("Invalid authentication. Redirecting...")
      setTimeout(() => router.push("/auth/signin"), 2000)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  )
}
