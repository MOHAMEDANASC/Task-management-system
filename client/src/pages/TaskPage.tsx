import TaskForm from "../features/task/TaskForm";
import TaskList from "../features/task/TaskList";
import { removeToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-6">

        <TaskForm />

        <div className="flex-1">
          <TaskList />
        </div>

      </div>

    </div>
  );
};

export default TaskPage;