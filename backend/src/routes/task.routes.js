const router = require("express").Router();
const auth = require("../middleware/auth");
const task = require("../controllers/task.controller");

router.post("/", auth, task.addTask);
router.get("/", auth, task.getTasks);

module.exports = router;
