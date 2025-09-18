import { applyDailyTaskStreak } from "../gameLogic/streakSystem";
import { computeXpAndBoost, nextXpAndLevel } from "../gameLogic/xpUtils";

export function buildUserAfterTask(
  user,
  rewardXp = 0,
  rewardGems = 0,
  calculateLevel
) {
  const { updatedUser } = applyDailyTaskStreak(user); // should NOT add gems/XP

  const { xpGain, nextBoostUses, nextBoostMultiplier } = computeXpAndBoost(
    updatedUser,
    rewardXp
  );

  const { nextXp, nextLevel } = nextXpAndLevel(
    updatedUser.xp,
    xpGain,
    calculateLevel
  );

  const newUser = {
    ...updatedUser,
    gems: (updatedUser.gems ?? 0) + (Number(rewardGems) || 0),
    xp: nextXp,
    level: nextLevel,
    xpBoostUsesLeft: nextBoostUses,
    xpBoostMultiplier: nextBoostMultiplier,
  };

  return { newUser };
}
