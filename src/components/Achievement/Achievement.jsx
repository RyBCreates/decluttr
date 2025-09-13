import { useState } from "react";
import "./Achievement.css";

function Achievement() {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div className="achievement">
      <div className="achievement__info">
        <div className="achievement__description">
          <div className="achievement__text">
            <h3 className="achievement__title">Name of Achievement</h3>
            {isCompleted ? (
              <p className="achievement__completed">(Completed)</p>
            ) : (
              <p className="achievement__reward">Reward: 20 Gems</p>
            )}
          </div>
          <p className="achievement__task">Do this to get your reward</p>
        </div>
        <p className="achievement__progress">10/10</p>
      </div>
      <div className="achievement__progress-bar"></div>
    </div>
  );
}

export default Achievement;
