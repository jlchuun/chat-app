import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate }  from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "@chat-app/common";
import { AccountContext } from "../AccountContext";
import { useContext, useState } from "react";


const Login = () => {
    const { 
        register, 
        formState: { errors }, 
        handleSubmit,
        reset 
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const navigate = useNavigate();
    const { setUser } = useContext(AccountContext);
    const [error, setError] = useState(null);

    const onSubmit = (values) => {
        console.log(values);
        reset();
        fetch("http://localhost:4000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            if (!res || !res.ok || res.status >= 400) {
                return;
            }
        return res.json();
        })
        .then(data => {
            if (!data) return;
            setUser({...data})
            if (data.status) {
                setError(data.status);
            } else {
                console.log(data);
                navigate("/home");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return (
        <div className={styles.loginPage}>
            <div className={styles.form}>
                <p className={styles.error}>{error}</p>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <p className={styles.error}>{errors.username?.message}</p>
                    <input type="text" {...register("username")} placeholder="username"/>
                    <p className={styles.error}>{errors.password?.message}</p>
                    <input type="password" {...register("password")} placeholder="password"/>
                    <button type="submit">Login</button>
                    <p className={styles.message}>Don't have an account? <Link to="register">Register here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;