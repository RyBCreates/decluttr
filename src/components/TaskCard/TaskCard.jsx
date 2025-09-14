import "./TaskCard.css";
import points from "../../assets/icons/points-icon.svg";

function TaskCard({ icon, name, gems, onDelete, onToggle }) {
  return (
    <div className="task-card">
      <div className="task-card__left">
        <span className="task-card__icon">{icon}</span>
        <div className="task-card__details">
          <p className="task-card__title">{name}</p>
          <p className="task-card__delete" onClick={onDelete}>
            Delete Task
          </p>
        </div>
      </div>

      <div className="task-card__right">
        <span className="task-card__gems">💎 {gems}</span>
        <input
          type="checkbox"
          className="task-card__checkbox"
          onChange={onToggle}
        />
      </div>
    </div>
  );
}

export default TaskCard;
