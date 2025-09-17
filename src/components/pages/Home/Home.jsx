const toggleTask = async (id, gems, experience) => {
  let shouldUpdateStats = false;

  setTasks((prevTasks) => {
    const already = prevTasks.find((t) => t._id === id);
    if (!already || already.completing) return prevTasks;

    shouldUpdateStats = true;

    return prevTasks.map((task) =>
      task._id === id
        ? {
            ...task,
            completed: true,
            completing: true,
            disabled: true,
          }
        : task
    );
  });

  if (shouldUpdateStats && setUser && user) {
    setUser((prev) => {
      if (!prev) return prev;

      const { updatedUser } = applyDailyTaskStreak(prev);

      const streakMult = Math.pow(
        1.01,
        Math.max((updatedUser.streak ?? 0) - 1, 0)
      );
      const boostMult = updatedUser.xpBoostMultiplier ?? 1;
      const boostUses = updatedUser.xpBoostUsesLeft ?? 0;

      const xpGain = Math.floor((Number(experience) || 0) * streakMult * boostMult);
      let nextBoostUses = boostUses;
      let nextBoostMult = boostMult;
      if (boostMult > 1 && boostUses > 0) {
        nextBoostUses = boostUses - 1;
        if (nextBoostUses <= 0) nextBoostMult = 1;
      }

      const nextXp = (updatedUser.xp ?? 0) + xpGain;
      const nextLevel = calculateLevel(nextXp);

      const newUser = {
        ...updatedUser,
        gems: (updatedUser.gems ?? 0) + (Number(gems) || 0),
        xp: nextXp,
        level: nextLevel,
        streak: updatedUser.streak,
        xpBoostUsesLeft: nextBoostUses,
        xpBoostMultiplier: nextBoostMult,
      };

      (async () => {
        try {
          await updateUserStats({
            xp: newUser.xp,
            level: newUser.level,
            gems: newUser.gems,
            streak: newUser.streak,
          });

          // Increment achievements after stats update
          const relevantAchievements = achievements.filter(
            (achievement) => achievement.taskId === id
          );

          for (const achievement of relevantAchievements) {
            try {
              const updated = await incrementAchievement({
                achievementId: achievement._id,
                amount: 1,
              });

              setUserAchievements((prev) => {
                const exists = prev.find(
                  (ua) =>
                    ua.achievementId._id ===
                    (updated.achievementId._id || updated.achievementId)
                );
                if (exists) {
                  return prev.map((ua) =>
                    ua.achievementId._id ===
                    (updated.achievementId._id || updated.achievementId)
                      ? updated
                      : ua
                  );
                } else {
                  return [...prev, updated];
                }
              });
            } catch (err) {
              console.error("Failed to increment achievement:", err);
            }
          }
        } catch (err) {
          console.error("Failed to update user stats:", err);
        }
      })();

      return newUser;
    });
  }

  setTimeout(() => {
    deleteTask(id);
    setClickedTaskId((prev) => (prev === id ? null : prev));
  }, ANIMATION_MS);
};
