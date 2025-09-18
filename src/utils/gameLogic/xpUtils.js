export function computeXpAndBoost(user, baseXp = 0) {
  const streak = Math.max((user?.streak ?? 0) - 1, 0);
  const streakMult = Math.pow(1.01, streak);
  const boostMult = user?.xpBoostMultiplier ?? 1;
  const boostUses = user?.xpBoostUsesLeft ?? 0;

  const xpGain = Math.floor((Number(baseXp) || 0) * streakMult * boostMult);

  let nextBoostUses = boostUses;
  let nextBoostMultiplier = boostMult;
  if (boostMult > 1 && boostUses > 0) {
    nextBoostUses = boostUses - 1;
    if (nextBoostUses <= 0) nextBoostMultiplier = 1;
  }

  return { xpGain, nextBoostUses, nextBoostMultiplier };
}

export function nextXpAndLevel(currentXp = 0, gainedXp = 0, calculateLevel) {
  const nextXp = (Number(currentXp) || 0) + (Number(gainedXp) || 0);
  return { nextXp, nextLevel: calculateLevel(nextXp) };
}
