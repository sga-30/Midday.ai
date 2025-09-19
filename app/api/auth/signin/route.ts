import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - in real app, this would verify against database
    if (email && password) {
      // Mock successful login
      const mockUser = {
        id: "1",
        email,
        full_name: "John Doe",
        company_name: "Acme Corp",
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
