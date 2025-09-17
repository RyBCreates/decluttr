import { useState, useContext } from "react";

import { CurrentUserContext } from "../../../contexts/UserContext";

import { updateUserStats } from "../../../utils/api/auth";

import { applyDailyTaskStreak } from "../../../utils/gameLogic/streakSystem";
import { calculateLevel } from "../../../utils/gameLogic/levelSystem";

import RightSideBar from "../../RightSideBar/RightSideBar";
import TaskCard from "../../TaskCard/TaskCard";
import "./Home.css";

function Home({ achievements, setActiveModal, tasks, setTasks }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const [clickedTaskId, setClickedTaskId] = useState(null);

  const ANIMATION_MS = 1000;

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleTask = (id, gems, experience) => {
    let shouldUpdateStats = false;

    setTasks((prevTasks) => {
      const already = prevTasks.find((t) => t._id === id);
      if (!already || already.completing) return prevTasks;

      shouldUpdateStats = true;

      return prevTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              completed: true,
              completing: true,
              disabled: true,
            }
          : task
      );
    });

    if (shouldUpdateStats && setUser && user) {
      const deltaGems = Number(gems) || 0;
      const baseXp = Number(experience) || 0;

      setUser((prev) => {
        if (!prev) return prev;

        const { updatedUser } = applyDailyTaskStreak(prev);

        const streakMult = Math.pow(
          1.01,
          Math.max((updatedUser.streak ?? 0) - 1, 0)
        );
        const boostMult = updatedUser.xpBoostMultiplier ?? 1;
        const boostUses = updatedUser.xpBoostUsesLeft ?? 0;

        const xpGain = Math.floor(baseXp * streakMult * boostMult);

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

        const newUser = {
          ...updatedUser,
          gems: (updatedUser.gems ?? 0) + deltaGems,
          xp: nextXp,
          level: nextLevel,
          streak: updatedUser.streak,
          xpBoostUsesLeft: nextBoostUses,
          xpBoostMultiplier: nextBoostMult,
        };

        (async () => {
          try {
            await updateUserStats({
              xp: newUser.xp,
              level: newUser.level,
              gems: newUser.gems,
              streak: newUser.streak,
            });
          } catch (err) {
            console.error("Failed to update user stats:", err);
          }
        })();

        return newUser;
      });
    }

    setTimeout(() => {
      deleteTask(id);
      setClickedTaskId((prev) => (prev === id ? null : prev));
    }, ANIMATION_MS);
  };

  const handleTaskClick = (id) => {
    setClickedTaskId((prev) => (prev === id ? null : id));
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
                completed={task.completed ?? false}
                isCompleting={task.completing ?? false}
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
