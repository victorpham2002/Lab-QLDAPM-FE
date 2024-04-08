import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const body = await req.json();
    console.log(body);

    const response = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: "Success" }), {
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
