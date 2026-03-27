import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/authApi";
import type { LoginInput, RegisterInput } from "../types/authTypes";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};
      
export const useLogin = () => { 
  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
  });
};
