const express = require("express");
const usersController = require("../controllers/users");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get("/", auth, usersController.getAllUsers);
router.get("/:id", auth, usersController.getOneUser);
router.put("/:id", auth, usersController.modifyUser);
router.delete("/:id", auth, usersController.deleteUser);

module.exports = router;
