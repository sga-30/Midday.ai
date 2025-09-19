import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, companyName } = await request.json()

    // Mock user creation - in real app, this would save to database
    if (email && password && fullName) {
      const mockUser = {
        id: Date.now().toString(),
        email,
        full_name: fullName,
        company_name: companyName || "",
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
