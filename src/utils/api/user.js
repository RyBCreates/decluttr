import { BASE_URL } from "../constants";

export async function updateUserInfo({ username, avatar }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, avatar }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user info");
  }

  return await response.json();
}
