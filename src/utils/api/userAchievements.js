import { BASE_URL, API_URL } from "../constants";

export const getUserAchievements = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await fetch(`${BASE_URL}${API_URL}/user-achievements/me`, {
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

// Note the id is the string that the achievement is called
// http://localhost:3002/decluttr/api/user-achievements/increment/hot-garbage
// Send Body of amount:1
export const incrementAchievement = async (achievementId, amount = 1) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authorized");

  try {
    const res = await fetch(
      `${BASE_URL}/user-achievements/increment/${achievementId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ achievementId, amount }),
      }
    );
    if (!res.ok) throw new Error("Failed to increment achievement");
    return await res.json();
  } catch (err) {
    console.error("Increment achievement error:", err);
    throw err;
  }
};
