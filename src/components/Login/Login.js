import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = data => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username", { required: true })} />
            <input {...register("password", { required: true })} />
            <input type="submit" />
        </form>
    );
}

export default Login;