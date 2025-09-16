import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/UserContext";

import RightSideBar from "../../RightSideBar/RightSideBar";
import TaskCard from "../../TaskCard/TaskCard";
import "./Home.css";

function Home({ achievements, setActiveModal, tasks, setTasks }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const [clickedTaskId, setClickedTaskId] = useState(null);

  // Delete a specific task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // Complete a task and get rewards?
  const toggleTask = (id, gems, experience) => {
    setTasks((prevTasks) => {
      const toggledTask = prevTasks.find((task) => task._id === id);
      if (!toggledTask) return prevTasks;

      const updatedTask = { ...toggledTask, completed: !toggledTask.completed };

      const otherTasks = prevTasks.filter((task) => task._id !== id);

      return [...otherTasks, updatedTask];
    });

    const deltaGems = Number(gems) || 0;
    const baseXp = Number(experience) || 0;

    if (setUser && user) {
      setUser((prev) => {
        if (!prev) return prev;

        // Base XP: equal to gems for now
        const baseXp = deltaGems;
        const multiplier = prev.xpBoostMultiplier ?? 1;
        const usesLeft = prev.xpBoostUsesLeft ?? 0;

        // Calculate XP gain with multiplier
        const xpGain = Math.floor(baseXp * multiplier);

        // Consume a boost use if active
        let nextUsesLeft = usesLeft;
        let nextMultiplier = multiplier;
        if (multiplier > 1 && usesLeft > 0) {
          nextUsesLeft = usesLeft - 1;
          if (nextUsesLeft <= 0) {
            nextUsesLeft = 0;
            nextMultiplier = 1;
          }
        }

        return {
          ...prev,
          gems: (prev.gems ?? 0) + deltaGems,
          xp: (prev.xp ?? 0) + xpGain,
          xpBoostUsesLeft: nextUsesLeft,
          xpBoostMultiplier: nextMultiplier,
        };
      });
    }
  };

  const handleTaskClick = (id) => {
    setClickedTaskId(id);
    setTasks((prevTasks) => {
      const clickedTask = prevTasks.find((task) => task._id === id);
      if (!clickedTask) return prevTasks;

      const finishedTask = { ...clickedTask, disabled: true };
      const otherTasks = prevTasks.filter((task) => task._id !== id);

      return [...otherTasks, finishedTask];
    });
  };

  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Daily Tasks</h1>
        <p
          className="home__add-task"
          onClick={() => {
            setActiveModal("add-task");
          }}
          style={{ cursor: "pointer" }}
        >
          + Add Task
        </p>
        <div className="home__task-gallery">
          {tasks.length === 0 ? (
            <>
              <p className="home__tasks-empty">
                Looks like you are out of tasks!
              </p>
              <button
                className="home__add-task_secondary"
                type="button"
                onClick={() => setActiveModal("add-task")}
              >
                Add Task
              </button>
            </>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                icon={task.icon}
                name={task.name}
                gems={task.reward?.gems ?? 0}
                onDelete={() => deleteTask(task._id)}
                onToggle={() =>
                  toggleTask(
                    task._id,
                    task.reward?.gems ?? 0,
                    task.reward?.xp ?? 0
                  )
                }
                onClick={() => handleTaskClick(task._id)}
                isSelected={task._id === clickedTaskId}
                disabled={task.disabled ?? false}
              />
            ))
          )}
        </div>
      </div>
      <RightSideBar achievements={achievements} />
    </div>
  );
}

export default Home;
