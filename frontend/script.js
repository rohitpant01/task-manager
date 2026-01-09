const API = "http://localhost:5000/api/v1";
let token = "";

// DOM references
const rname = document.getElementById("rname");
const remail = document.getElementById("remail");
const rpassword = document.getElementById("rpassword");

const lemail = document.getElementById("lemail");
const lpassword = document.getElementById("lpassword");

const task = document.getElementById("task");
const taskList = document.getElementById("taskList");

const header = document.getElementById("header");
const welcome = document.getElementById("welcome");

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const taskBox = document.getElementById("taskBox");
const taskListBox = document.getElementById("taskListBox");

/* INITIAL UI STATE */
header.style.display = "none";
taskBox.style.display = "none";
taskListBox.style.display = "none";

/* REGISTER */
function register() {
  fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: rname.value,
      email: remail.value,
      password: rpassword.value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message || "Registered");
    rname.value = "";
    remail.value = "";
    rpassword.value = "";
  });
}

/* LOGIN */
function login() {
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: lemail.value,
      password: lpassword.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.token) {
      alert("Login failed");
      return;
    }

    token = data.token;

    // UI changes
    header.style.display = "block";
    welcome.textContent = `Welcome, ${data.name}`;

    loginBox.style.display = "none";
    registerBox.style.display = "none";
    taskBox.style.display = "block";
    taskListBox.style.display = "block";

    lemail.value = "";
    lpassword.value = "";

    loadTasks();
  });
}

/* ADD TASK */
function addTask() {
  if (!token) {
    alert("Please login first");
    return;
  }

  fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title: task.value })
  })
  .then(() => {
    task.value = "";
    loadTasks();
  });
}

/* LOAD TASKS */
function loadTasks() {
  fetch(`${API}/tasks`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(tasks => {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<li>No tasks yet</li>";
      return;
    }

    tasks.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t.title;
      taskList.appendChild(li);
    });
  });
}

/* LOGOUT */
function logout() {
  token = "";

  header.style.display = "none";
  loginBox.style.display = "block";
  registerBox.style.display = "block";
  taskBox.style.display = "none";
  taskListBox.style.display = "none";

  taskList.innerHTML = "";
  alert("Logged out successfully");
}
