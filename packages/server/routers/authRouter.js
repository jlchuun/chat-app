const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const {loginSchema, registerSchema} = require("@chat-app/common");
const { loginAuth, registerAuth, handleLogin } = require("../controllers/authController");

router
    .route("/login")
    .get(handleLogin)
    .post(validateForm(loginSchema), loginAuth);

router
    .post("/register", (validateForm(registerSchema), registerAuth));

module.exports = router;