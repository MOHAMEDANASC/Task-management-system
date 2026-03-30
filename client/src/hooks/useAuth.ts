import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/api";
import type { LoginInput, RegisterInput } from "../types/authTypes";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),

    onSuccess: (data) => {
      dispatch(loginSuccess(data)); 
    },
  });
};

