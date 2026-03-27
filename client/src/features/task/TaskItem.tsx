import type { Task } from "../../types/taskTypes";
import { useDeleteTask, useUpdateTask } from "./taskHooks";
import { useState } from "react";

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isEdit, setIsEdit] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleUpdate = () => {
    updateTask({
      id: task.id,
      data: {
        title,
        description,
        status,
        dueDate,
      },
    });

    setIsEdit(false);
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white mb-3">

      {isEdit ? (
        <div className="space-y-2">

          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "todo" | "in-progress" | "done"
              )
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <input
            className="w-full border p-2 rounded"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>

        </div>
      ) : (
        <div>

          <h3 className="text-lg font-bold">
            {task.title}
          </h3>

          <p>{task.description}</p>

          <p className="text-sm">
            Status: <b>{task.status}</b>
          </p>

          <p className="text-sm">
            Due: {task.dueDate}
          </p>

          <div className="flex gap-2 mt-2">

            <button
              onClick={() => setIsEdit(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default TaskItem;