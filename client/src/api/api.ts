import api from "../lib/axios";
import type { LoginInput, RegisterInput, AuthResponse } from "../types/authTypes";
import type { Task, TaskInput } from "../types/taskTypes";


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

export const getTasks = async (
  page: number,
  status: string,
  search: string
): Promise<any> => {

  const res = await api.get(
    `/tasks?page=${page}&limit=3&status=${status}&search=${search}`
  );

  return res.data;
};

export const createTask = async (
  data: TaskInput
): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (
  id: number,
  data: TaskInput
): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (
  id: number
): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};


