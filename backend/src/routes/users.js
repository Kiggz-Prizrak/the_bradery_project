const express = require("express");
const usersController = require("../controllers/users");

const router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get("/",  usersController.getAllUsers);
router.get("/:id",  usersController.getOneUser);
router.put("/:id",   usersController.modifyUser);
router.delete("/:id",  usersController.deleteUser);

module.exports = router;
