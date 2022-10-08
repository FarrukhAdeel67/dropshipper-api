const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/driver");

router.post("/", controller.createDriver )
router.get("/", controller.allPosts )
router.get("/driverProfile", controller.driverProfile);

router.post("/profile", controller.profilePost)
router.get("/profile", controller.profileGet);

module.exports = router;
