import { useContext } from "react";
import "./RightSideBar.css";

import UserStats from "../UserStats/UserStats";
import Achievement from "../Achievement/Achievement";

import { achievements } from "../../utils/mockData/mockAchievements";
import { userAchievements } from "../../utils/mockData/mockUserAchievements";
import { CurrentUserContext } from "../../contexts/UserContext";

function RightSideBar() {
  const { user } = useContext(CurrentUserContext);

  return (
    <div className="right-sidebar">
      <UserStats />
      <div className="right-sidebar__achievements">
        {user ? (
          achievements.map((achievement) => {
            const userProgress = userAchievements.find(
              (userAchievement) =>
                userAchievement.userId === user.id &&
                userAchievement.achievementId === achievement.id
            );
            return (
              <Achievement
                key={achievement.id}
                achievementVariant="home"
                achievement={achievement}
                progress={userProgress?.progress || 0}
                completed={userProgress?.completed || false}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default RightSideBar;
