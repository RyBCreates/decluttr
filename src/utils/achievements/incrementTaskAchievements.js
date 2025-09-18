export async function incrementTaskAchievements(
  achievements,
  incrementAchievementApi,
  setUserAchievements
) {
  const relevant = (achievements || []).filter((a) => a.type === "task_count");
  for (const achievement of relevant) {
    try {
      const updated = await incrementAchievementApi(achievement._id, 1);
      const updatedId = updated.achievementId._id || updated.achievementId;
      setUserAchievements((prev) => {
        const exists = prev.find((ua) => ua.achievementId._id === updatedId);
        return exists
          ? prev.map((ua) =>
              ua.achievementId._id === updatedId ? updated : ua
            )
          : [...prev, updated];
      });
    } catch (e) {
      console.error("Failed to increment achievement:", e);
    }
  }
}
