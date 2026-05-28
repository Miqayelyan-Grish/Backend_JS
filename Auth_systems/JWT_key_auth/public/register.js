const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const button = document.getElementById("registerBtn");

const API_BASE = "http://localhost:3000";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!button) return;

  button.disabled = true;
  message.textContent = "";

  try {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
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

    message.textContent = "User created successfully!";

    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } catch (err) {
    message.textContent = "Server not reachable";
  } finally {
    button.disabled = false;
  }
});
