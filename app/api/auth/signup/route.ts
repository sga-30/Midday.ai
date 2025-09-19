import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function POST(req: Request) {
  try {
    const { email, password, fullName } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Sign up the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
      },
    })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    // Return the new user
    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
      token: data.session?.access_token,
    })
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
