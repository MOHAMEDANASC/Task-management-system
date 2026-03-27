import { useState, useEffect } from "react";
import { useTasks } from "./taskHooks";
import TaskItem from "./TaskItem";

const TaskList = () => {

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } =
    useTasks(page, status, debouncedSearch);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="flex-1">

      <h2 className="text-xl font-bold mb-3">
        Task List
      </h2>

      {/* SEARCH */}

      <input
        placeholder="Search task..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 mb-2 w-full"
      />

      {/* FILTER */}

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
        className="border p-2 mb-3"
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">
          In Progress
        </option>
        <option value="done">Done</option>
      </select>

      {data?.tasks.map((task: any) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {/* PAGINATION */}

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={data.tasks.length < 3}
          className="px-3 py-1 bg-gray-300"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default TaskList;