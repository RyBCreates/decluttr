import { useState, useContext } from "react";

import { CurrentUserContext } from "../../../contexts/UserContext";

import { updateUserStats } from "../../../utils/api/auth";
import { incrementAchievement } from "../../../utils/api/userAchievements";

import { applyDailyTaskStreak } from "../../../utils/gameLogic/streakSystem";
import { calculateLevel } from "../../../utils/gameLogic/levelSystem";

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

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleTask = async (id, gems, experience) => {
    // Update task state
    setTasks((prevTasks) => {
      const toggledTask = prevTasks.find((task) => task._id === id);
      if (!toggledTask) return prevTasks;
      return prevTasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      );
    });

    const deltaGems = Number(gems) || 0;
    const baseXp = Number(experience) || 0;

    if (!user || !setUser) return;

    // Update user stats
    const { updatedUser } = applyDailyTaskStreak(user);
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
      if (nextBoostUses <= 0) nextBoostMult = 1;
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

    setUser(newUser);

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

    // Increment achievements for this task
    const relevantAchievements = achievements.filter(
      (achievement) => achievement.taskId === id
    );

    for (const achievement of relevantAchievements) {
      try {
        const updated = await incrementAchievement({
          achievementId: achievement._id,
          amount: 1,
        });
        console.log("Updated userAchievement:", updated);

        setUserAchievements((prev) => {
          const exists = prev.find(
            (ua) =>
              ua.achievementId._id ===
              (updated.achievementId._id || updated.achievementId)
          );
          if (exists) {
            return prev.map((ua) =>
              ua.achievementId._id ===
              (updated.achievementId._id || updated.achievementId)
                ? updated
                : ua
            );
          } else {
            return [...prev, updated];
          }
        });
      } catch (err) {
        console.error("Failed to increment achievement:", err);
      }
    }

    deleteTask(id);
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
      <RightSideBar
        achievements={achievements}
        userAchievements={userAchievements}
      />
    </div>
  );
}

export default Home;
