const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const {loginSchema, registerSchema} = require("@chat-app/common");
const loginAuth = require("../controllers/loginAuth");
const registerAuth = require("../controllers/registerAuth");

router.post("/login", (req, res) => {
    validateForm(req, res, loginSchema);
    loginAuth(req, res);
});

router.post("/register", (req, res) => {
    validateForm(req, res, registerSchema);
    registerAuth(req, res);
})

module.exports = router;