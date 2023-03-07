import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { Link }  from "react-router-dom";



const Register = () => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={styles.registerPage}>
            <div className={styles.form}>
                <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                    <p className={styles.error}>{errors.email?.message}</p>
                    <input {...register("email", { required: "Email is required" })} placeholder="email"/>
                    <p className={styles.error}>{errors.username?.message}</p>
                    <input {...register("username", { 
                        required: "Username is required",
                        minLength: {
                            value: 6,
                            message: "Username must be at least 6 characters"
                        },
                        maxLength: {
                            value: 20,
                            message: "Username can not be more than 20 characters"
                        } 
                        })} 
                        placeholder="username"/>
                    <p className={styles.error}>{errors.password?.message}</p>
                    <input type="password" {...register("password", { 
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                        maxLength: {
                            value: 20,
                            message: "Password can not be more than 20 characters"
                        },
                        pattern: {
                            value: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$",
                            message: "Password must contain at least one capital and one number"
                        } 
                        })} 
                        placeholder="password"/>
                    <p className={styles.error}>{errors.confirm_password?.message}</p>
                    <input type="password" {...register("confirm_password", { 
                        required: "Password is required",
                        validate:  (val) => {
                            if (watch("password") != val) {
                                return "Passwords must match";
                            }
                        }
                        })} 
                        placeholder="confirm password"/>
                    <button type="submit">Register</button>
                    <p className={styles.message}>Already have an account? <Link to="/">Login here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;