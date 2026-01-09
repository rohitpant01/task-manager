const db = require("../config/db");

exports.addTask = (req, res) => {
  db.query(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [req.body.title, req.userId],
    () => res.json({ message: "Task added" })
  );
};

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.userId],
    (err, tasks) => res.json(tasks)
  );
};
