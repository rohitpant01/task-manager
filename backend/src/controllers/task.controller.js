const db = require("../config/db");
const logger = require("../utils/logger");

exports.addTask = (req, res) => {
  const { title } = req.body;

  // Validation error (400)
  if (!title) {
    logger.error("Task creation failed: title missing");
    return res.status(400).json({ message: "Title is required" });
  }

  db.query(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, req.userId],
    (err, result) => {
      if (err) {
        // Database error (500)
        logger.error(`Add task DB error: ${err.message}`);
        return res.status(500).json({ message: "Database error" });
      }

      // Success log (info)
      logger.info(`Task added successfully for user ${req.userId}`);
      res.json({ message: "Task added" });
    }
  );
};

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.userId],
    (err, tasks) => {
      if (err) {
        // Database error (500)
        logger.error(`Fetch tasks DB error: ${err.message}`);
        return res.status(500).json({ message: "Database error" });
      }

      // Success log (optional)
      logger.info(`Tasks fetched for user ${req.userId}`);
      res.json(tasks);
    }
  );
};
