import { BASE_URL } from "../constants";

export async function getAchievements() {
  try {
    const response = await fetch(`${BASE_URL}/achievements`);
    if (!response.ok) {
      throw new Error("Failed to fetch achievements");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return [];
  }
}
