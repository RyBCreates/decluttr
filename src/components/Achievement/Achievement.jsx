import { useState, useEffect } from "react";
import "./Achievement.css";

function Achievement({ achievement, progress, completed, achievementVariant }) {
  const [displayProgress, setDisplayProgress] = useState(progress);

  useEffect(() => {
    setDisplayProgress(progress);
  }, [progress]);

  const overAchieved = displayProgress > achievement.goal;

  return (
    <div
      className={
        achievementVariant === "home"
          ? "achievement-home"
          : "achievement-profile"
      }
    >
      {achievementVariant === "home" ? (
        <div className="achievement-home__info">
          <div className="achievement-home__text">
            <h2 className="achievement-home__title">{achievement.name}</h2>
            <p className="achievement-home__task">- {achievement.task}</p>
          </div>
          <div className="achievement-home__progress-bar">
            <div
              className="achievement-home__progress-bar_progress"
              style={{
                "--progress": `${
                  displayProgress === achievement.goal
                    ? "0"
                    : (displayProgress / achievement.goal) * 100
                }%`,
              }}
            ></div>
            <div
              className={`achievement-home__progress-bar_incomplete ${
                completed ? "achievement-home__progress-bar_completed" : ""
              }`}
              style={{
                "--progress": `${
                  ((achievement.goal - displayProgress) / achievement.goal) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="achievement-profile__info">
            <div className="achievement-profile__description">
              <div className="achievement-profile__text">
                <h3 className="achievement-profile__title">
                  {achievement.name}
                </h3>
                {completed ? (
                  <p className="achievement-profile__completed">(Completed)</p>
                ) : (
                  <p className="achievement-profile__reward">
                    Reward:
                    {achievement.reward.gems || achievement.reward.badge}
                  </p>
                )}
              </div>
              <p className="achievement-profile__task">{achievement.task}</p>
            </div>
            <p className="achievement-profile__progress">
              {overAchieved
                ? `${achievement.goal}/${achievement.goal}`
                : `${displayProgress}/${achievement.goal}`}
            </p>
          </div>
          <div className="achievement-profile__progress-bar">
            <div
              className="achievement-profile__progress-bar_progress"
              style={{
                "--progress": `${
                  displayProgress === achievement.goal
                    ? "0"
                    : (displayProgress / achievement.goal) * 100
                }%`,
              }}
            ></div>
            <div
              className={`achievement-profile__progress-bar_incomplete ${
                completed ? "achievement-profile__progress-bar_completed" : ""
              }`}
              style={{
                "--progress": `${
                  ((achievement.goal - displayProgress) / achievement.goal) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Achievement;
