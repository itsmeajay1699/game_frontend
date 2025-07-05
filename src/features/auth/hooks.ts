// features/auth/hooks.ts
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api/authApi";
import type { LoginForm, RegisterForm } from "./schema";


export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterForm) => registerUser(data),
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginForm) => loginUser(data),
    });
};