import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import adminRoutes from "./routes/adminRoutes";

import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

export default app;