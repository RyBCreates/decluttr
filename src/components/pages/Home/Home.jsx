import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/UserContext";

import RightSideBar from "../../RightSideBar/RightSideBar";
import TaskCard from "../../TaskCard/TaskCard";
import { tasks as mockTasks } from "../../../utils/mockData/mockTasks";

import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([...mockTasks]);
  const { user, setUser } = useContext(CurrentUserContext);

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            icon={task.icon}
            name={task.name}
            gems={task.gems}
            onDelete={() => deleteTask(task.id)}
            onToggle={() => toggleTask(task.id, task.gems)}
          />
        ))}
      </div>

      <RightSideBar />
    </div>
  );
}

export default Home;
