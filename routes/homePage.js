const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");
const clientController = require("../controllers/client");
//Routers
const driverRouter = require("./driver");
const clientRouter = require("./client");
router.use("/clientHomePage", clientRouter);
router.use("/driverHomePage", driverRouter);

module.exports = router;
