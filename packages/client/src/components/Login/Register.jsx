import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink, useNavigate }  from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "@chat-app/common";

import { AccountContext } from "../AccountContext";
import { useContext, useState } from "react";

import { Alert, Container, TextField, Button, Link, Box } from "@mui/material/";


const Register = () => {
    const { control, 
            reset,
            formState: { errors }, 
            handleSubmit 
        } = useForm({
            resolver: yupResolver(registerSchema),
            defaultValues: {
                email: "",
                username: "",
                password: "",
                confirmPassword: ""
            }
    });

    const { setUser } = useContext(AccountContext);
    const navigate = useNavigate();
    const [inputError, setInputError] = useState(null);
    

    const onSubmit = values => {
        console.log(values);
        reset();
        fetch("http://localhost:4000/auth/register", {
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
                setInputError(data.status);
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
        <Container component="main" maxWidth="xs"
                sx={{
                    display: 'grid',
                    placeSelf: 'center'
                }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {inputError ? <Alert severity="error">{inputError}</Alert> : ''}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="email"
                        control={control}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                autoFocus
                                error={error !== undefined}
                                helperText={error ? errors.email.message : ''}
                            />
                        )}
                    />
                    <Controller 
                        name="username"
                        control={control}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <TextField 
                                {...field}
                                inputRef={ref}
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="off"
                                error={error !== undefined}
                                helperText={error ? errors.username.message : ''}
                            />
                        )}
                    />
                    <Controller 
                        name="password"
                        control={control}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                error={error !== undefined}
                                helperText={error ? errors.password.message : ''}
                            />
                        )}
                    />
                    <Controller 
                        name="confirmPassword"
                        control={control}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                margin="normal"
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                error={error !== undefined}
                                helperText={error ? errors.confirmPassword.message : ''}
                            />
                        )}
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </form>
            </Box>
            <Link component={RouterLink} to="/" variant="body2">
                {"Already have an account? Login Here"}
            </Link>
        </Container>
    );
}

export default Register;