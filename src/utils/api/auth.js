import { BASE_URL, API_URL } from "../constants";

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }

    return await response.json();
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
};

export const updateUserStats = async ({ xp, level, gems, streak }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}${API_URL}/users/stats`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ xp, level, gems, streak }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user stats");
  }

  return await response.json();
};
