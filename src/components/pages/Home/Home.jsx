import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/UserContext";

import { applyDailyTaskStreak } from "../../../utils/gameLogic/streakSystem";
import { calculateLevel } from "../../../utils/gameLogic/levelSystem";

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

        const { updatedUser } = applyDailyTaskStreak(prev);

        const baseXp = deltaGems;
        const streakMult = Math.pow(
          1.01,
          Math.max((updatedUser.streak ?? 0) - 1, 0)
        );
        const boostMult = updatedUser.xpBoostMultiplier ?? 1;
        const boostUses = updatedUser.xpBoostUsesLeft ?? 0;

        let xpGain = Math.floor(baseXp * streakMult * boostMult);

        let nextBoostUses = boostUses;
        let nextBoostMult = boostMult;
        if (boostMult > 1 && boostUses > 0) {
          nextBoostUses = boostUses - 1;
          if (nextBoostUses <= 0) {
            nextBoostUses = 0;
            nextBoostMult = 1;
          }
        }

        const nextXp = (updatedUser.xp ?? 0) + xpGain;
        const nextLevel = calculateLevel(nextXp);

        return {
          ...updatedUser,
          gems: (updatedUser.gems ?? 0) + deltaGems,
          xp: nextXp,
          level: nextLevel,
          xpBoostUsesLeft: nextBoostUses,
          xpBoostMultiplier: nextBoostMult,
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
                completed={task.completed}
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
