import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { Link }  from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "@chat-app/common";



const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const onSubmit = data => console.log(data);

    return (
        <div className={styles.registerPage}>
            <div className={styles.form}>
                <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                    <p className={styles.error}>{errors.email?.message}</p>
                    <input {...register("email")} placeholder="email"/>
                    <p className={styles.error}>{errors.username?.message}</p>
                    <input {...register("username")} 
                        placeholder="username"/>
                    <p className={styles.error}>{errors.password?.message}</p>
                    <input type="password" {...register("password")} 
                        placeholder="password"/>
                    <p className={styles.error}>{errors.confirmPassword?.message}</p>
                    <input type="password" {...register("confirmPassword")} 
                        placeholder="confirm password"/>
                    <button type="submit">Register</button>
                    <p className={styles.message}>Already have an account? <Link to="/">Login here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;