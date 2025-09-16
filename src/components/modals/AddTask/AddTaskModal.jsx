import "./AddTaskModal.css";
import "../Modals.css";
import { useEffect, useState } from "react";
import { tasks } from "../../../utils/mockData/mockTasks";

function AddTaskModal({ activeModal, closeModal, onAddTask }) {
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id || null);
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [gems, setGems] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeModal === "addTask") {
      setSelectedTaskId(tasks[0]?.id || null);
      setError("");
    }
  }, [activeModal]);

  const handleChange = (e) => {
    setSelectedTaskId(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTask = tasks.find((task) => task.id === selectedTaskId);
    if (!selectedTask) {
      setError("Please select a valid task.");
      return;
    }
    setError("");
    onAddTask(selectedTask);
    closeModal();
  };

  if (activeModal !== "addTask") return null;

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
              {tasks.map(({ id, name, gems, icon }) => (
                <option key={id} value={id}>
                  {icon} {name} (💎 {gems})
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
