const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const {loginSchema, registerSchema} = require("@chat-app/common");
const loginAuth = require("../controllers/loginAuth");

router.post("/login", (req, res) => {
    validateForm(req, res, loginSchema);
    loginAuth(req, res);
});

router.post("/register", (req, res) => {
    validateForm(req, res, registerSchema);
})

module.exports = router;