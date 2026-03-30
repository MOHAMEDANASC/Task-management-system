import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getAllTasksAdmin = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { user: true },
    });

    res.json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const deleteTaskAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUserAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.task.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const updateTaskAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { title },
    });

    res.json(task);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const updateUserAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { email } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { email },
    });

    res.json(user);
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};


