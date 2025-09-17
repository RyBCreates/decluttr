import { BASE_URL, API_URL } from "../constants";

export async function getTasks() {
  try {
    const response = await fetch(`${BASE_URL}${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
}
