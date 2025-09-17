export async function registerUser({ username, email, password }) {
  try {
    const response = await fetch(`http://localhost:3002/register`, {
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
}
