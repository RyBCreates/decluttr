import { BASE_URL, API_URL } from "../constants";

export const getBadges = async () => {
  try {
    const response = await fetch(`${BASE_URL}${API_URL}/badges`);
    if (!response.ok) {
      throw new Error("Failed to fetch badges");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching badges:", err);
    return [];
  }
};
