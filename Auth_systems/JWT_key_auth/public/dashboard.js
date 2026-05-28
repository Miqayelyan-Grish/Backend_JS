const token = sessionStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

const userEmail = document.getElementById("userEmail");
const postsContainer = document.getElementById("posts");

const fetchData = async () => {
  const meResponse = await fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!meResponse.ok) {
    sessionStorage.removeItem("token");

    window.location.href = "/login.html";
  }

  const meData = await meResponse.json();

  userEmail.textContent = meData.user.email;

  const postsResponse = await fetch("/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await postsResponse.json();

  posts.forEach((post) => {
    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `
      <h3>${post.title}</h3>
    `;

    postsContainer.append(div);
  });
};

fetchData();

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("token");

  window.location.href = "/login.html";
});
