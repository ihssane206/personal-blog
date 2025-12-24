const postsDiv = document.getElementById("posts");
const loadBtn = document.getElementById("loadPostsBtn");
const refreshBtn = document.getElementById("refreshBtn");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

function showLoading(show) {
  loading.style.display = show ? "block" : "none";
}

function loadPosts() {
  postsDiv.innerHTML = "";
  errorDiv.textContent = "";
  showLoading(true);

  fetch("../data/posts.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    })
    .then(posts => {
      posts.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button onclick="loadComments(${post.id})">View Comments</button>
          <div id="comments-${post.id}"></div>
          <hr>
        `;
        postsDiv.appendChild(div);
      });
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => showLoading(false));
}

function loadComments(postId) {
  const commentsDiv = document.getElementById(`comments-${postId}`);
  commentsDiv.textContent = "Loading comments...";

  fetch("../data/comments.json")
    .then(res => res.json())
    .then(comments => {
      const filtered = comments.filter(c => c.postId === postId);
      commentsDiv.innerHTML = filtered
        .map(c => `<p><b>${c.author}:</b> ${c.text}</p>`)
        .join("");
    });
}

loadBtn.addEventListener("click", loadPosts);
refreshBtn.addEventListener("click", loadPosts);
