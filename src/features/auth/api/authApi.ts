// features/auth/api/authApi.ts
import axiosClient from "@/lib/axios";
import type { LoginForm, RegisterForm } from "../schema";
import type { AuthResponse } from "../types";



export const registerUser = async (
    data: RegisterForm
): Promise<AuthResponse> => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
};


export const loginUser = async (data: LoginForm): Promise<AuthResponse> => {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
};
