import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Server: Received request data:", body)

    const response = await fetch("https://astrology-application-10.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    console.log("[v0] Server: FastAPI response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Server: FastAPI error response:", errorText)
      throw new Error(`FastAPI request failed with status ${response.status}: ${errorText}`)
    }

    const result = await response.json()
    console.log("[v0] Server: FastAPI success response:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Server: API route error:", error)
    return NextResponse.json(
      {
        error: "Failed to connect to astrology service",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
