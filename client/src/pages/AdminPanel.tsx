import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const getTasks = async () => {
    try {
      const res = await api.get("/admin/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/admin/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getTasks();
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getUsers();
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const updateTask = async (id: number) => {
    try {
      await api.put(
        `/admin/task/${id}`,
        { title: taskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditTaskId(null);
      setTaskTitle("");
      getTasks();
    } catch (err) {
      console.error("Update task error:", err);
    }
  };

  const updateUser = async (id: number) => {
    try {
      await api.put(
        `/admin/user/${id}`,
        { email: userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditUserId(null);
      setUserEmail("");
      getUsers();
    } catch (err) {
      console.error("Update user error:", err);
    }
  };

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          {tasks.map((t) => (
            <div key={t.id} className="flex gap-2 mb-2">

              {editTaskId === t.id ? (
                <>
                  <input
                    className="border p-1 flex-1"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />

                  <button
                    className="bg-green-500 text-white px-2"
                    onClick={() => updateTask(t.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{t.title}</span>

                  <button
                    className="bg-yellow-500 text-white px-2"
                    onClick={() => {
                      setEditTaskId(t.id);
                      setTaskTitle(t.title);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-2"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Users</h2>

          {users.map((u) => (
            <div key={u.id} className="flex gap-2 mb-2">

              {editUserId === u.id ? (
                <>
                  <input
                    className="border p-1 flex-1"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />

                  <button
                    className="bg-green-500 text-white px-2"
                    onClick={() => updateUser(u.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{u.email}</span>

                  <button
                    className="bg-yellow-500 text-white px-2"
                    onClick={() => {
                      setEditUserId(u.id);
                      setUserEmail(u.email);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-2"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;