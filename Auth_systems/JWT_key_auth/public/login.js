const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = document.getElementById("loginBtn");

const API_BASE = "http://localhost:3000";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!button) return;

  button.disabled = true;
  message.textContent = "";

  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
      return;
    }

    sessionStorage.setItem("token", data.token);

    window.location.href = "/dashboard.html";
  } catch (err) {
    message.textContent = "Server not reachable";
  } finally {
    button.disabled = false;
  }
});
