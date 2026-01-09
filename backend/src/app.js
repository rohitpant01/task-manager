const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Morgan → Winston logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// API routes
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/tasks", require("./routes/task.routes"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = app;
