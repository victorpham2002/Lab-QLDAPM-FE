"use server";
import React from "react";
import Event from "./_component/Event";
import { cookies } from "next/headers";

// goi api o day ne, xong truyen vo trong cai component Event

const approveEventById = async (id: string) => {
  "use server";

  const token = cookies().get("token") ?? "none";
  const response = await fetch(`http://localhost:3001/events/${id}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });
  console.log("response:", response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return { data, success: true };
  } else {
    console.error("Failed to approve event");
    return { success: false };
  }
};

const denyEventById = async (id: string) => {
  "use server";

  const token = cookies().get("token") ?? "none";
  const response = await fetch(`http://localhost:3001/events/${id}/deny`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });
  console.log("response:", response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return { data, success: true };
  } else {
    console.error("Failed to deny event");
    return { success: false };
  }
};

const joinEventById = async (id: string) => {
  "use server"

  const token = cookies().get("token") ?? "none";
  const response = await fetch(`http://localhost:3001/events/${id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });
  console.log("response:", response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return { data, success: true };
  } else {
    console.error("Failed to deny event");
    return { success: false };
  }
}

const App: React.FC<{ params: { role: string } }> = async ({ params }) => {
  const role = params.role.toLowerCase() as "admin" | "organizer" | "student";
  return (
    <Event
      role={role}
      approveEventById={approveEventById}
      denyEventById={denyEventById}
      joinEventById={joinEventById}
    />
  );
};

export default App;
