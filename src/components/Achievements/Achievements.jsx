import { useContext } from "react";
import Achievement from "../Achievement/Achievement";

import { achievements } from "../../utils/mockData/mockAchievements";
import { userAchievements } from "../../utils/mockData/mockUserAchievements";

import { CurrentUserContext } from "../../contexts/UserContext";

import "./Achievements.css";

function Achievements() {
  const { user } = useContext(CurrentUserContext);

  return (
    <section className="achievements profile__tab">
      <h2 className="achievements__title">Here are your Achievements!</h2>
      <div className="achievements__collection">
        {achievements.map((achievement) => {
          const userProgress = userAchievements.find(
            (userAchievement) =>
              userAchievement.userId === user.id &&
              userAchievement.achievementId === achievement.id
          );
          return (
            <Achievement
              key={achievement.id}
              achievementVariant="profile"
              achievement={achievement}
              progress={userProgress?.progress || 0}
              completed={userProgress?.completed || false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Achievements;
