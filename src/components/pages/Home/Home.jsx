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
    const delta = Number(gems) || 0;
    if (setUser && user) {
      setUser((prev) =>
        prev ? { ...prev, gems: (prev.gems ?? 0) + delta } : prev
      );
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
