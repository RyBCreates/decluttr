export const dayKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const diffInDays = (fromKey, toKey) => {
  if (!fromKey) return Number.POSITIVE_INFINITY;
  const from = new Date(`${fromKey}T00:00:00`);
  const to = new Date(`${toKey}T00:00:00`);
  const ms = to - from;
  return Math.round(ms / 86400000);
};

export function applyDailyTaskStreak(user) {
  const today = dayKey();
  const last = user?.lastTaskDate || null;

  if (last === today) {
    return { updatedUser: user, bonus: 0, awardedToday: false };
  }

  const gap = diffInDays(last, today);
  let newStreak = 1;
  let consumeFreeze = false;

  if (gap === 1) {
    newStreak = (user?.streak ?? 0) + 1;
  } else if (gap === 2 && (user?.streakFreezes ?? 0) > 0) {
    newStreak = (user?.streak ?? 0) + 1;
    consumeFreeze = true;
  } else {
    newStreak = 1;
  }

  // Causes First task of the day to give an extra 5 gems
  const dailyBonus = Math.round(5 * Math.pow(1.01, newStreak - 1));

  const updatedUser = {
    ...user,
    streak: newStreak,
    lastTaskDate: today,
    gems: (user?.gems ?? 0) + dailyBonus,
    streakFreezes: Math.max(
      (user?.streakFreezes ?? 0) - (consumeFreeze ? 1 : 0),
      0
    ),
  };

  return { updatedUser, bonus: dailyBonus, awardedToday: true };
}
