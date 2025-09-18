import { BASE_URL, API_URL } from "../constants";

export const getUserBadges = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await fetch(`${BASE_URL}${API_URL}/user-badges/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user achievements");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Get user achievements error:", err);
    return [];
  }
};

// Note the id is the string that the badge is called
// http://localhost:3002/decluttr/api/user-badges/unlock/clean-sweep
export const unlockBadge = async (badgeId, token) => {
  const res = await fetch(
    `${BASE_URL}${API_URL}/user-badges/unlock/${badgeId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to unlock badge");
  }

  return res.json();
};
