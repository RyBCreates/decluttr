import { BASE_URL } from "../constants";

export async function getShopItems() {
  try {
    const response = await fetch(`${BASE_URL}/shop-items`);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching items:", err);
    return [];
  }
}
