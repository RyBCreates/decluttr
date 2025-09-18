import { BASE_URL, API_URL } from "../constants";

export const getUserItems = async (token) => {
  if (!token) return [];

  try {
    const res = await fetch(`${BASE_URL}${API_URL}/user-items/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user items");
    return await res.json();
  } catch (err) {
    console.error("Get user items error:", err);
    return [];
  }
};

// Note the id is the string that the item is called
// http://localhost:3002/decluttr/api/user-items/purchase/streak-freeze
export const purchaseItem = async (itemId, token) => {
  if (!token) throw new Error("No auth token found");

  const res = await fetch(
    `${BASE_URL}${API_URL}/user-items/purchase/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to purchase item");
  }

  return res.json();
};
