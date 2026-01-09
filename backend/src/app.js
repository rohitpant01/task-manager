const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/tasks", require("./routes/task.routes"));

// Serve frontend (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = app;
