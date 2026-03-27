import api from "./axios";
import type { LoginInput, RegisterInput, AuthResponse } from "../types/authTypes";



export const registerUser = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (
  data: LoginInput
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};