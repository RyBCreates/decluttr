import Achievement from "../Achievement/Achievement";

import { achievements } from "../../utils/mockData/mockAchievements";
import "./Achievements.css";

function Achievements() {
  return (
    <section className="achievements profile__tab">
      <h2 className="achievements__title">Here are your Achievements!</h2>
      <div className="achievements__collection">
        {achievements.map((achievement) => (
          <Achievement achievement={achievement} key={achievement.id} />
        ))}
      </div>
    </section>
  );
}

export default Achievements;
