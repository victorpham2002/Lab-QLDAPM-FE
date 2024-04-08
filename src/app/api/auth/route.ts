import type { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify({ data: data, message: "Success" }), {
        status: 200,
      });
    } else {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ success: false, error: errorData }),
        {
          status: response.status,
        },
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      {
        status: 500,
      },
    );
  }
}
