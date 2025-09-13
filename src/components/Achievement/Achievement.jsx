import { useState } from "react";
import "./Achievement.css";

function Achievement({ achievement }) {
  const [isCompleted, setIsCompleted] = useState(false);

  console.log(achievement);
  return (
    <div className="achievement">
      <div className="achievement__info">
        <div className="achievement__description">
          <div className="achievement__text">
            <h3 className="achievement__title">{achievement.name}</h3>
            {isCompleted ? (
              <p className="achievement__completed">(Completed)</p>
            ) : (
              <p className="achievement__reward">
                Reward: {achievement.reward}
              </p>
            )}
          </div>
          <p className="achievement__task">{achievement.task}</p>
        </div>
        <p className="achievement__progress">10/{achievement.goal}</p>
      </div>
      <div className="achievement__progress-bar"></div>
    </div>
  );
}

export default Achievement;
