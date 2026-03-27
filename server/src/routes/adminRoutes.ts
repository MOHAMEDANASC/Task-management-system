import express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

import {
  getAllTasksAdmin,
  deleteTaskAdmin,
  getAllUsers,
  deleteUserAdmin,
  updateTaskAdmin,
  updateUserAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.get(
  "/tasks",
  authMiddleware,
  adminOnly,
  getAllTasksAdmin
);

router.delete(
  "/task/:id",
  authMiddleware,
  adminOnly,
  deleteTaskAdmin
);

router.get(
  "/users",
  authMiddleware,
  adminOnly,
  getAllUsers
);

router.delete(
  "/user/:id",
  authMiddleware,
  adminOnly,
  deleteUserAdmin
);

router.put(
  "/task/:id",
  authMiddleware,
  adminOnly,
  updateTaskAdmin
);

router.put(
  "/user/:id",
  authMiddleware,
  adminOnly,
  updateUserAdmin
);

export default router;