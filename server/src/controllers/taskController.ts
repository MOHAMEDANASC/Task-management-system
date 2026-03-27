import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { taskSchema } from "../validators/taskValidator";


export const getTasks = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const status = req.query.status as string | undefined;

    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
        where: {
            userId,
            ...(status && status !== "all"
                ? { status }
                : {}),
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });

    const total = await prisma.task.count({
        where: {
            userId,
            ...(status && status !== "all"
                ? { status }
                : {}),
        },
    });

    res.json({
        tasks,
        total,
        page,
        limit,
    });
};

export const createTask = async (req: Request, res: Response) => {

    const parsed = taskSchema.parse(req.body);

    const { title, description, status, dueDate } = parsed;

    const userId = (req as any).user.id;

    const task = await prisma.task.create({
        data: {
            title,
            description,
            status,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            userId,
        },
    });

    res.json(task);
};


export const updateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const parsed = taskSchema.parse(req.body);

    const { title, description, status, dueDate } = parsed;

    const task = await prisma.task.update({
        where: { id },
        data: {
            title,
            description,
            status,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        },
    });

    res.json(task);
};


export const deleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await prisma.task.delete({
        where: { id },
    });

    res.json({
        message: "Task deleted",
    });
};
