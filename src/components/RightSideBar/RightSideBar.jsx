import "./RightSideBar.css";
import fire from "../../assets/icons/fire-icon.svg";
import points from "../../assets/icons/points-icon.svg";
import experience from "../../assets/icons/exp-icon.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/UserContext";

function RightSideBar() {
  const { user } = useContext(CurrentUserContext);

  const streak = user?.streak ?? 0;
  const gems = user?.gems ?? 0;
  const level = user?.level ?? 0;

  return (
    <div className="right-sidebar">
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Daily Streak</p>
        <p className="right-sidebar__value">
          <img src={fire} alt="" className="right-sidebar__icon" />
          {streak}
        </p>
      </div>
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Gems</p>
        <p className="right-sidebar__value">
          <img src={points} alt="" className="right-sidebar__icon" /> {gems}
        </p>
      </div>
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Level</p>
        <p className="right-sidebar__value">
          <img src={experience} alt="" className="right-sidebar__icon" />
          {level}
        </p>
      </div>
    </div>
  );
}

export default RightSideBar;
