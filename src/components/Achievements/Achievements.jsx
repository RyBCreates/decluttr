import { useContext } from "react";
import Achievement from "../Achievement/Achievement";

import { CurrentUserContext } from "../../contexts/UserContext";

import "./Achievements.css";

function Achievements({ achievements, userAchievements }) {
  const { user } = useContext(CurrentUserContext);

  return (
    <section className="achievements profile__tab">
      <h2 className="achievements__title">Here are your Achievements!</h2>
      <div className="achievements__collection">
        {achievements.map((achievement) => {
          const userProgress = userAchievements.find(
            (ua) =>
              (ua.userId === user._id || ua.userId === user.id) &&
              ua.achievementId?._id === achievement._id
          );

          return (
            <Achievement
              key={achievement._id}
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
