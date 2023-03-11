import * as yup from "yup";

const loginSchema = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required")
    }).required();

const registerSchema = yup.object({
        email: yup.string()
            .required("Email is required")
            .email(),
        username: yup.string()
            .required("Username is required")
            .min(6, "Username is too short")
            .max(20, "Username is too long"),
        password: yup.string()
            .required("Password is required")
            .min(6, "Password is too short")
            .max(20, "Password is too long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password must contain at least one capital and one number"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
    }).required();

export { loginSchema, registerSchema };