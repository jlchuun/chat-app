import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { Link }  from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "@chat-app/common";


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const onSubmit = data => console.log(data);
    return (
        <div className={styles.loginPage}>
            <div className={styles.form}>
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