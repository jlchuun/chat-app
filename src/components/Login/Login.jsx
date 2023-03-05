import style from "./Login.module.css";
import { useForm } from "react-hook-form";


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = data => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username", { 
                required: "Username is required", 
                minLength: {
                    value: 6,
                    message: "Username is too short"
                }, 
                maxLength: {
                    value: 30,
                    message: "Username is too long"
                } 
            })}
            aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === 'required' && <p>{errors.username.message}</p>}
            <input {...register("password", { 
                required: "Password is required", 
                minLength: {
                    value: 6,
                    message: "Password is too short"
                }, 
                maxLength: {
                    value: 30,
                    message: "Password is too long"
                } 
            })} 
            aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === 'required' && <p>{errors.password.message}</p>}

            <input type="submit" />
        </form>
    );
}

export default Login;