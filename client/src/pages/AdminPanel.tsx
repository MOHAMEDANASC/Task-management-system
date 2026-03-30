// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../lib/axios";

// const AdminPanel = () => {
//   const navigate = useNavigate();

//   const [tasks, setTasks] = useState<any[]>([]);
//   const [users, setUsers] = useState<any[]>([]);

//   const [editTaskId, setEditTaskId] = useState<number | null>(null);
//   const [editUserId, setEditUserId] = useState<number | null>(null);

//   const [taskTitle, setTaskTitle] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, []);

//   const getTasks = async () => {
//     try {
//       const res = await api.get("/admin/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   const getUsers = async () => {
//     try {
//       const res = await api.get("/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const deleteTask = async (id: number) => {
//     try {
//       await api.delete(`/admin/task/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       getTasks();
//     } catch (err) {
//       console.error("Delete task error:", err);
//     }
//   };

//   const deleteUser = async (id: number) => {
//     try {
//       await api.delete(`/admin/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       getUsers();
//     } catch (err) {
//       console.error("Delete user error:", err);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/"); 
//   };

//   const updateTask = async (id: number) => {
//     try {
//       await api.put(
//         `/admin/task/${id}`,
//         { title: taskTitle },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setEditTaskId(null);
//       setTaskTitle("");
//       getTasks();
//     } catch (err) {
//       console.error("Update task error:", err);
//     }
//   };

//   const updateUser = async (id: number) => {
//     try {
//       await api.put(
//         `/admin/user/${id}`,
//         { email: userEmail },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setEditUserId(null);
//       setUserEmail("");
//       getUsers();
//     } catch (err) {
//       console.error("Update user error:", err);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//     getUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Panel</h1>

//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded"
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-2 gap-6">

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Tasks</h2>

//           {tasks.map((t) => (
//             <div key={t.id} className="flex gap-2 mb-2">

//               {editTaskId === t.id ? (
//                 <>
//                   <input
//                     className="border p-1 flex-1"
//                     value={taskTitle}
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                   />

//                   <button
//                     className="bg-green-500 text-white px-2"
//                     onClick={() => updateTask(t.id)}
//                   >
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span className="flex-1">{t.title}</span>

//                   <button
//                     className="bg-yellow-500 text-white px-2"
//                     onClick={() => {
//                       setEditTaskId(t.id);
//                       setTaskTitle(t.title);
//                     }}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="bg-red-500 text-white px-2"
//                     onClick={() => deleteTask(t.id)}
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}

//             </div>
//           ))}
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Users</h2>

//           {users.map((u) => (
//             <div key={u.id} className="flex gap-2 mb-2">

//               {editUserId === u.id ? (
//                 <>
//                   <input
//                     className="border p-1 flex-1"
//                     value={userEmail}
//                     onChange={(e) => setUserEmail(e.target.value)}
//                   />

//                   <button
//                     className="bg-green-500 text-white px-2"
//                     onClick={() => updateUser(u.id)}
//                   >
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span className="flex-1">{u.email}</span>

//                   <button
//                     className="bg-yellow-500 text-white px-2"
//                     onClick={() => {
//                       setEditUserId(u.id);
//                       setUserEmail(u.email);
//                     }}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="bg-red-500 text-white px-2"
//                     onClick={() => deleteUser(u.id)}
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}

//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminPanel;








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"tasks" | "users">("tasks");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
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
      if (selectedUserId === id) setSelectedUserId(null);
      getUsers();
    } catch (err) {
      console.error("Delete user error:", err);
    }
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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const filteredTasks = selectedUserId
    ? tasks.filter((t) => t.userId === selectedUserId)
    : tasks;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#0f1117" }}>

      {/* Sidebar */}
      <aside style={{
        width: "260px",
        background: "#24293a",
        borderRight: "1px solid #242631",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #2a2d3a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 700, color: "#fff"
            }}>A</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>AdminPanel</div>
              <div style={{ color: "#6b7280", fontSize: "11px" }}>Management Console</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          <p style={{ color: "#4b5563", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", padding: "0 12px", marginBottom: "8px" }}>NAVIGATION</p>

          {[
            { id: "tasks", label: "All Tasks", icon: "✓", count: tasks.length },
            { id: "users", label: "Users", icon: "👤", count: users.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setSelectedUserId(null); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                background: activeTab === item.id && !selectedUserId ? "linear-gradient(135deg, #6366f120, #8b5cf620)" : "transparent",
                color: activeTab === item.id && !selectedUserId ? "#a78bfa" : "#9ca3af",
                fontWeight: activeTab === item.id ? 600 : 400, fontSize: "13px",
                marginBottom: "2px", transition: "all 0.15s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{item.icon}</span> {item.label}
              </span>
              <span style={{
                background: "#2a2d3a", borderRadius: "12px", padding: "1px 7px",
                fontSize: "11px", color: "#6b7280"
              }}>{item.count}</span>
            </button>
          ))}

          {/* Users list for task filtering */}
          <p style={{ color: "#4b5563", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", padding: "16px 12px 8px", marginBottom: "4px" }}>FILTER BY USER</p>

          <button
            onClick={() => { setSelectedUserId(null); setActiveTab("tasks"); }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: !selectedUserId && activeTab === "tasks" ? "#6366f120" : "transparent",
              color: !selectedUserId && activeTab === "tasks" ? "#a78bfa" : "#9ca3af",
              fontWeight: !selectedUserId ? 600 : 400, fontSize: "13px", marginBottom: "2px",
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: "50%", background: "#374151",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", flexShrink: 0,
            }}>All</span>
            All Tasks
          </button>

          <div style={{ maxHeight: "280px", overflowY: "auto" }}>
            {users.map((u) => {
              const initials = u.email?.[0]?.toUpperCase() || "?";
              const isSelected = selectedUserId === u.id;
              const userTaskCount = tasks.filter((t) => t.userId === u.id).length;
              return (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUserId(u.id); setActiveTab("tasks"); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                    background: isSelected ? "linear-gradient(135deg, #6366f120, #8b5cf620)" : "transparent",
                    color: isSelected ? "#a78bfa" : "#9ca3af",
                    fontWeight: isSelected ? 600 : 400, fontSize: "12px", marginBottom: "2px",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: isSelected ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#374151",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", color: "#fff", flexShrink: 0,
                    }}>{initials}</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {u.email}
                    </span>
                  </span>
                  {userTaskCount > 0 && (
                    <span style={{
                      background: isSelected ? "#6366f140" : "#2a2d3a",
                      borderRadius: "12px", padding: "1px 7px", fontSize: "10px",
                      color: isSelected ? "#a78bfa" : "#6b7280", flexShrink: 0,
                    }}>{userTaskCount}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px", borderTop: "1px solid #2a2d3a" }}>
          <button
            onClick={logout}
            style={{
              width: "100%", padding: "10px", border: "1px solid #ef444430",
              borderRadius: "8px", background: "#ef444410", color: "#ef4444",
              fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{
          padding: "20px 32px", borderBottom: "1px solid #2a2d3a",
          background: "#16181f", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ color: "#f9fafb", fontSize: "20px", fontWeight: 700, margin: 0 }}>
              {activeTab === "users"
                ? "User Management"
                : selectedUser
                ? `Tasks — ${selectedUser.email}`
                : "All Tasks"}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "12px", margin: "2px 0 0" }}>
              {activeTab === "users"
                ? `${users.length} registered users`
                : selectedUser
                ? `${filteredTasks.length} tasks assigned`
                : `${tasks.length} total tasks`}
            </p>
          </div>

          {selectedUserId && (
            <button
              onClick={() => setSelectedUserId(null)}
              style={{
                padding: "7px 14px", border: "1px solid #374151", borderRadius: "8px",
                background: "transparent", color: "#9ca3af", fontSize: "12px", cursor: "pointer",
              }}
            >
              ← Back to All Tasks
            </button>
          )}
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>

          {/* TASKS TAB */}
          {activeTab === "tasks" && (
            <div>
              {filteredTasks.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#4b5563" }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
                  <p style={{ fontSize: "14px" }}>No tasks found for this user.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: "8px" }}>
                  {filteredTasks.map((t, i) => (
                    <div
                      key={t.id}
                      style={{
                        background: "#16181f", border: "1px solid #2a2d3a",
                        borderRadius: "10px", padding: "14px 18px",
                        display: "flex", alignItems: "center", gap: "12px",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <span style={{
                        width: 28, height: 28, borderRadius: "8px",
                        background: "#1e2130", border: "1px solid #374151",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", color: "#6b7280", flexShrink: 0, fontWeight: 600,
                      }}>{i + 1}</span>

                      {editTaskId === t.id ? (
                        <>
                          <input
                            autoFocus
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && updateTask(t.id)}
                            style={{
                              flex: 1, background: "#1e2130", border: "1px solid #6366f1",
                              borderRadius: "6px", padding: "6px 10px", color: "#f9fafb",
                              fontSize: "13px", outline: "none",
                            }}
                          />
                          <button
                            onClick={() => updateTask(t.id)}
                            style={btnStyle("#22c55e")}
                          >Save</button>
                          <button
                            onClick={() => { setEditTaskId(null); setTaskTitle(""); }}
                            style={btnStyle("#6b7280")}
                          >Cancel</button>
                        </>
                      ) : (
                        <>
                          <span style={{ flex: 1, color: "#e5e7eb", fontSize: "13px" }}>{t.title}</span>
                          {!selectedUserId && t.userEmail && (
                            <span style={{
                              fontSize: "11px", color: "#6b7280", background: "#1e2130",
                              border: "1px solid #374151", borderRadius: "20px", padding: "2px 9px",
                            }}>{t.userEmail}</span>
                          )}
                          <button
                            onClick={() => { setEditTaskId(t.id); setTaskTitle(t.title); }}
                            style={btnStyle("#f59e0b")}
                          >Edit</button>
                          <button
                            onClick={() => deleteTask(t.id)}
                            style={btnStyle("#ef4444")}
                          >Delete</button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && (
            <div style={{ display: "grid", gap: "8px" }}>
              {users.map((u, i) => (
                <div
                  key={u.id}
                  style={{
                    background: "#16181f", border: "1px solid #2a2d3a",
                    borderRadius: "10px", padding: "14px 18px",
                    display: "flex", alignItems: "center", gap: "12px",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `hsl(${(i * 57) % 360}, 55%, 45%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>
                    {u.email?.[0]?.toUpperCase()}
                  </div>

                  {editUserId === u.id ? (
                    <>
                      <input
                        autoFocus
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && updateUser(u.id)}
                        style={{
                          flex: 1, background: "#1e2130", border: "1px solid #6366f1",
                          borderRadius: "6px", padding: "6px 10px", color: "#f9fafb",
                          fontSize: "13px", outline: "none",
                        }}
                      />
                      <button onClick={() => updateUser(u.id)} style={btnStyle("#22c55e")}>Save</button>
                      <button onClick={() => { setEditUserId(null); setUserEmail(""); }} style={btnStyle("#6b7280")}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#e5e7eb", fontSize: "13px", fontWeight: 500 }}>{u.email}</div>
                        <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "1px" }}>
                          {tasks.filter((t) => t.userId === u.id).length} tasks
                        </div>
                      </div>
                      <button
                        onClick={() => { setSelectedUserId(u.id); setActiveTab("tasks"); }}
                        style={{
                          padding: "5px 12px", border: "1px solid #374151", borderRadius: "6px",
                          background: "transparent", color: "#9ca3af", fontSize: "12px", cursor: "pointer",
                        }}
                      >View Tasks</button>
                      <button
                        onClick={() => { setEditUserId(u.id); setUserEmail(u.email); }}
                        style={btnStyle("#f59e0b")}
                      >Edit</button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        style={btnStyle("#ef4444")}
                      >Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const btnStyle = (color: string) => ({
  padding: "5px 12px",
  border: `1px solid ${color}40`,
  borderRadius: "6px",
  background: `${color}15`,
  color: color,
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap" as const,
  transition: "all 0.15s",
});

export default AdminPanel;







