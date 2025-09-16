export const calculateXPForLevel = (level) => {
  if (level <= 1) return 0;
  return (level - 1) * 100;
};

export const calculateLevel = (xp) => {
  const total = Math.max(0, Number(xp) || 0);
  return Math.floor(total / 100) + 1;
};
