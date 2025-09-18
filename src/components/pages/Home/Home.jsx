import { useState, useContext } from "react";

import { CurrentUserContext } from "../../../contexts/UserContext";

import { updateUserStats } from "../../../utils/api/auth";
import { incrementAchievement } from "../../../utils/api/userAchievements";

import { calculateLevel } from "../../../utils/gameLogic/levelSystem";

import { buildUserAfterTask } from "../../../utils/users/buildUserAfterTask";
import { incrementTaskAchievements } from "../../../utils/achievements/incrementTaskAchievements";

import RightSideBar from "../../RightSideBar/RightSideBar";
import TaskCard from "../../TaskCard/TaskCard";
import "./Home.css";

function Home({
  achievements,
  setActiveModal,
  tasks,
  setTasks,
  userAchievements,
  setUserAchievements,
}) {
  const { user, setUser } = useContext(CurrentUserContext);
  const [clickedTaskId, setClickedTaskId] = useState(null);

  const ANIMATION_MS = 1000;

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleTask = async (id, gems, experience) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id
          ? { ...task, completed: true, completing: true, disabled: true }
          : task
      )
    );

    if (!user) return;

    const { newUser } = buildUserAfterTask(
      user,
      experience,
      gems,
      calculateLevel
    );
    setUser(newUser);

    try {
      await updateUserStats({
        xp: newUser.xp,
        level: newUser.level,
        gems: newUser.gems,
        streak: newUser.streak,
      });

      await incrementTaskAchievements(
        achievements,
        incrementAchievement,
        setUserAchievements
      );
    } catch (err) {
      console.error("Failed to update after task:", err);
    }

    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
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
          onClick={() => setActiveModal("add-task")}
          style={{ cursor: "pointer" }}
        >
          + Add Task
        </p>

        <div className="home__task-gallery">
          {tasks.length === 0 ? (
            <div className="home__empty">
              <p className="home__empty-message">
                Looks like you are out of tasks!
              </p>
              <button
                className="home__add-task_secondary"
                type="button"
                onClick={() => setActiveModal("add-task")}
              >
                Add Task
              </button>
            </div>
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

      <RightSideBar
        achievements={achievements}
        userAchievements={userAchievements}
      />
    </div>
  );
}

export default Home;
