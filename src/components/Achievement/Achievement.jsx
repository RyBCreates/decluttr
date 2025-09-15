import "./Achievement.css";

function Achievement({ achievement, progress, completed, achievementVariant }) {
  return (
    <div
      className={
        achievementVariant === "home"
          ? "achievement__home"
          : "achievement__profile"
      }
    >
      {achievementVariant === "home" ? (
        <></>
      ) : (
        <>
          <div className="achievement__info">
            <div className="achievement__description">
              <div className="achievement__text">
                <h3 className="achievement__title">{achievement.name}</h3>
                {completed ? (
                  <p className="achievement__completed">(Completed)</p>
                ) : (
                  <p className="achievement__reward">
                    Reward: {achievement.reward}
                  </p>
                )}
              </div>
              <p className="achievement__task">{achievement.task}</p>
            </div>
            <p className="achievement__progress">
              {progress}/{achievement.goal}
            </p>
          </div>
          <div
            className={`achievement__progress-bar ${
              completed ? "achievement__progress_completed" : ""
            }`}
            style={{ "--progress": `${(progress / achievement.goal) * 100}%` }}
          ></div>
        </>
      )}
    </div>
  );
}

export default Achievement;
