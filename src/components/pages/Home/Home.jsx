import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/UserContext";

import RightSideBar from "../../RightSideBar/RightSideBar";
import TaskCard from "../../TaskCard/TaskCard";
import { getTasks } from "../../../utils/api/tasks";

import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const { user, setUser } = useContext(CurrentUserContext);

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleTask = (id, gems) => {
    const deltaGems = Number(gems) || 0;

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

    deleteTask(id);
  };

  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Daily Tasks</h1>
        <p className="home__add-task">+ Add Task</p>
        <div className="home__task-gallery">
          {tasks.length === 0 ? (
            <>
              <p className="home__tasks-empty">
                Looks like you are out of tasks!
              </p>
              <button className="home__add-task_secondary" type="button">
                Add Task
              </button>
            </>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                icon={task.icon}
                name={task.name}
                gems={task.reward.gems}
                onDelete={() => deleteTask(task._id)}
                onToggle={() => toggleTask(task._id, task.reward.gems)}
              />
            ))
          )}
        </div>
      </div>

      <RightSideBar />
    </div>
  );
}

export default Home;
