import { useEffect, useState } from "react";

import "./AddTaskModal.css";
import "../Modals.css";

function AddTaskModal({ activeModal, closeModal, onAddTask, tasks }) {
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?._id ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeModal === "add-task") {
      setSelectedTaskId(tasks[0]?._id ?? "");
      setError("");
    }
  }, [activeModal, tasks]);

  const handleChange = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTask = tasks.find((task) => task._id === selectedTaskId);
    if (!selectedTask) {
      setError("Please select a valid task.");
      return;
    }
    setError("");
    onAddTask(selectedTask);
    closeModal();
  };

  if (activeModal !== "add-task") return null;

  return (
    <div className="add-task modal modal__opened">
      <div className="add-task__content">
        <h2 className="add-task__title">Add a New Task</h2>
        <form className="add-task__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="task-select" className="add-task__label">
            Select Task:
            <select
              id="task-select"
              className="add-task__select"
              value={selectedTaskId}
              onChange={handleChange}
              required
            >
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.icon} {task.name} (💎 {task.reward.gems})
                </option>
              ))}
            </select>
          </label>
          {error && <p className="add-task__error">{error}</p>}

          <div className="add-task__buttons">
            <button type="submit" className="add-task__submit">
              Add Task
            </button>
            <button
              type="button"
              className="add-task__cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
