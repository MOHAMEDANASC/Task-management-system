import api from "./axios";
import type { Task, TaskInput } from "../types/taskTypes";


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


