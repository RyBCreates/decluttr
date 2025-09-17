import { useContext } from "react";

import "./UserStats.css";
import fire from "../../assets/icons/fire-icon.svg";
import gem from "../../assets/icons/gem.png";
import experience from "../../assets/icons/exp-icon.svg";
import { calculateXPForLevel } from "../../utils/gameLogic/levelSystem";

import { CurrentUserContext } from "../../contexts/UserContext";

function UserStats() {
  const { user } = useContext(CurrentUserContext);

  const streak = user?.streak ?? 0;
  const gems = user?.gems ?? 0;
  const level = user?.level ?? 0;
  const xp = user?.xp ?? 0;

  const currThreshold = calculateXPForLevel(level);
  const nextThreshold = calculateXPForLevel(level + 1);
  const xpIntoLevel = Math.max(0, xp - currThreshold);
  const xpForThisLevel = Math.max(1, nextThreshold - currThreshold);
  const xpToNext = Math.max(0, nextThreshold - xp);

  return (
    <div className="user-stats">
      <div className="user-stats__stat">
        <p className="user-stats__label">Daily Streak</p>
        <p className="user-stats__value">
          <img src={fire} alt="streak icon" className="user-stats__icon" />
          {streak}
        </p>
      </div>
      <div className="user-stats__stat">
        <p className="user-stats__label">Gems</p>
        <p className="user-stats__value">
          <img src={gem} alt="gems icon" className="user-stats__icon" /> {gems}
        </p>
      </div>
      <div className="user-stats__stat">
        <p className="user-stats__label">Level</p>
        <p
          className="user-stats__value user-stats__tooltip-wrap"
          tabIndex={0}
          aria-describedby="xp-tooltip"
          aria-label={`Level ${level}, ${xpIntoLevel} out of ${xpForThisLevel} XP into this level, ${xpToNext} XP to next level`}
        >
          <img
            src={experience}
            alt="experience icon"
            className="user-stats__icon"
          />
          {level}
          <span className="user-stats__tooltip">
            XP: {xpIntoLevel} / {xpForThisLevel} • Need {xpToNext}
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserStats;
