import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),

  description: z.string().optional(),

  status: z.enum(["todo", "in-progress", "done"]).optional(),

  dueDate: z.string().optional(),
});