import "./RightSideBar.css";
import fire from "../../assets/icons/fire-icon.svg";
import points from "../../assets/icons/points-icon.svg";
import experience from "../../assets/icons/exp-icon.svg";

function RightSideBar() {
  return (
    <div className="right-sidebar">
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Daily Streak</p>
        <p className="right-sidebar__value">
          <img src={fire} alt="" className="right-sidebar__icon" />
          364
        </p>
      </div>
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Points</p>
        <p className="right-sidebar__value">
          <img src={points} alt="" className="right-sidebar__icon" /> 999
        </p>
      </div>
      <div className="right-sidebar__stat">
        <p className="right-sidebar__label">Level</p>
        <p className="right-sidebar__value">
          <img src={experience} alt="" className="right-sidebar__icon" /> 10
        </p>
      </div>
    </div>
  );
}

export default RightSideBar;
