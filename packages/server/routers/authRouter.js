const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/express/validateForm");
const {loginSchema, registerSchema} = require("@chat-app/common");
const { loginAuth, registerAuth, handleLogin, handleLogout } = require("../controllers/authController");
const { rateLimiter } = require("../controllers/express/rateLimiter");

// API Rate limit
const SECONDS_LIMIT = 60;
const LIMIT_AMOUNT = 10;

router
    .route("/login")
    .get(handleLogin)
    .post(validateForm(loginSchema), rateLimiter(SECONDS_LIMIT, LIMIT_AMOUNT), loginAuth);

router
    .post("/register", (validateForm(registerSchema), rateLimiter(SECONDS_LIMIT, LIMIT_AMOUNT), registerAuth));
    
router
    .route("/logout")
    .post(handleLogout);

module.exports = router;