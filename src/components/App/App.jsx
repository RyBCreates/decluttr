import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";
import Quiz from "../pages/Quiz/Quiz";

import LoginModal from "../modals/LoginModal/LoginModal";
import RegisterModal from "../modals/RegisterModal/RegisterModal";
import AddTaskModal from "../modals/AddTaskModal/AddTaskModal.jsx";

import { getAchievements } from "../../utils/api/achievements";
import { getBadges } from "../../utils/api/badges";
import { getTasks } from "../../utils/api/tasks";
import { getCurrentUser } from "../../utils/api/auth.js";

import { CurrentUserContext } from "../../contexts/UserContext";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Close Modals(global)
  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSwitchModal = () => {
    if (activeModal === "register") {
      closeModal();
      setActiveModal("login");
    } else {
      setActiveModal("register");
    }
  };

  // Load User using jwt token
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    }
    loadUser();
  }, []);

  // Load ALL achievements
  useEffect(() => {
    async function loadAchievements() {
      const data = await getAchievements();
      setAchievements(data);
    }
    loadAchievements();
  }, []);

  // Load ALL badges
  useEffect(() => {
    async function loadBadges() {
      const data = await getBadges();
      setBadges(data);
    }
    loadBadges();
  }, []);

  // Load ALL tasks
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load Tasks", err);
        setTasks([]);
      }
    }
    loadTasks();
  }, []);

  const handleAddTask = (newTask) => {
    // This newId does not work with the database format
    const newId =
      tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task._id)) + 1;
    const taskWithId = {
      ...newTask,
      _id: newId,
      completed: false,
      reward: { gems: newTask.gems ?? 0, xp: newTask.xp ?? 5 },
    };
    setTasks((prev) => [taskWithId, ...prev]);
    closeModal();
  };

  return (
    <CurrentUserContext.Provider
      value={{ user: currentUser, setUser: setCurrentUser }}
    >
      <div className="app">
        <div className="app__content">
          <LeftSideBar
            isLoggedIn={isLoggedIn}
            handleLoginClick={handleLoginClick}
            handleLogoutClick={handleLogoutClick}
            handleRegisterClick={handleRegisterClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  achievements={achievements}
                  setActiveModal={setActiveModal}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              }
            />
            <Route
              path="profile"
              element={<Profile achievements={achievements} badges={badges} />}
            />
            <Route path="shop" element={<Shop />} />
            <Route path="quiz" element={<Quiz achievements={achievements} />} />
          </Routes>
        </div>
        <RegisterModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
          setIsLoggedIn={setIsLoggedIn}
        />
        <LoginModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
          setCurrentUser={setCurrentUser}
          setIsLoggedIn={setIsLoggedIn}
        />
        <AddTaskModal
          activeModal={activeModal}
          closeModal={closeModal}
          onAddTask={handleAddTask}
          tasks={tasks}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
