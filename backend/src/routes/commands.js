const express = require("express");
const commandsController = require("../controllers/");

const router = express.Router();

router.post("/", commandsController.createCommand);
router.get("/", commandsController.getAllCommands);
router.get("/:id", commandsController.getOneCommand);
router.delete("/:id", commandsController.deleteOneCommand);

module.exports = router;
