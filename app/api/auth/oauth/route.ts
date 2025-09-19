import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json()

    // Simulate OAuth authentication
    // In a real app, this would handle OAuth flow with the provider
    if (provider === "github" || provider === "google") {
      // Mock successful OAuth response
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        provider: provider,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      }

      const mockToken = `${provider}_token_${Date.now()}`

      return NextResponse.json({
        success: true,
        user: mockUser,
        token: mockToken,
        message: `Successfully signed in with ${provider}`,
      })
    } else {
      return NextResponse.json({ success: false, error: "Unsupported OAuth provider" }, { status: 400 })
    }
  } catch (error) {
    console.error("OAuth error:", error)
    return NextResponse.json({ success: false, error: "OAuth authentication failed" }, { status: 500 })
  }
}
