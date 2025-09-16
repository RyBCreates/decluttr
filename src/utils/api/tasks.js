import { BASE_URL } from "../constants";

export async function getTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
}
