import "./TaskCard.css";

function TaskCard({
  icon,
  name,
  gems,
  onDelete,
  onToggle,
  onClick,
  isSelected,
  completed,
  disabled,
}) {
  return (
    <div
      className={`task-card ${isSelected ? "task-card--selected" : ""}`}
      onClick={onClick}
    >
      <div className="task-card__left">
        <span className="task-card__icon">{icon}</span>
        <div className="task-card__details">
          <p className="task-card__title">{name}</p>
          <p
            className="task-card__delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete Task
          </p>
        </div>
      </div>

      <div className="task-card__right">
        <span className="task-card__gems">💎 {gems}</span>
        <input
          type="checkbox"
          className="task-card__checkbox"
          checked={!!completed}
          onClick={(e) => e.stopPropagation()}
          onChange={onToggle}
        />
      </div>
    </div>
  );
}

export default TaskCard;
