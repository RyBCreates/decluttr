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
  isCompleting,
}) {
  const className = [
    "task-card",
    isSelected ? "task-card--selected" : "",
    isCompleting ? "task-card--completing" : "",
    disabled ? "task-card--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} onClick={isCompleting ? undefined : onClick}>
      <div className="task-card__left">
        <span className="task-card__icon">{icon}</span>
        <div className="task-card__details">
          <p className="task-card__title">{name}</p>
          <p
            className="task-card__delete"
            onClick={(e) => {
              e.stopPropagation();
              if (!isCompleting) onDelete();
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
          disabled={!!disabled || !!isCompleting}
          onClick={(e) => e.stopPropagation()}
          onChange={isCompleting ? undefined : onToggle}
        />
      </div>
    </div>
  );
}

export default TaskCard;
