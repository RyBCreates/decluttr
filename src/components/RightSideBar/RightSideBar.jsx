import { useContext } from "react";
import "./RightSideBar.css";

import UserStats from "../UserStats/UserStats";
import Achievement from "../Achievement/Achievement";

import { CurrentUserContext } from "../../contexts/UserContext";

function RightSideBar({ achievements, userAchievements = [] }) {
  const { user } = useContext(CurrentUserContext);
  console.log("UserAchievements loaded to RightSideBar:", userAchievements);

  if (!user) return null;

  return (
    <div className="right-sidebar">
      <UserStats />
      <div className="right-sidebar__achievements">
        {achievements.map((achievement) => {
          const userProgress = userAchievements.find(
            (ua) =>
              (ua.userId === user._id || ua.userId === user.id) &&
              ua.achievementId?._id === achievement._id
          );

          return (
            <Achievement
              key={achievement._id}
              achievementVariant="home"
              achievement={achievement}
              progress={userProgress?.progress || 0}
              completed={userProgress?.completed || false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RightSideBar;
