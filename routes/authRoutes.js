const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authController.homePage);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

router.get("/dashboard", isAuthenticated, authController.dashboard);
router.get("/auth/logout", authController.logout);

module.exports = router;
