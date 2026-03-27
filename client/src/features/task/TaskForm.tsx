import { useState } from "react";
import { useCreateTask } from "./taskHooks";

const TaskForm = () => {
  const { mutate, isPending } = useCreateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      title,
      description,
      status: status as "todo" | "in-progress" | "done",
      dueDate,
    });

    setTitle("");
    setDescription("");
    setStatus("todo");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md space-y-3 w-80"
    >
      <h2 className="text-lg font-bold">Add Task</h2>

      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded-lg"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        className="w-full border p-2 rounded-lg"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 text-white p-2 rounded-lg"
      >
        {isPending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;