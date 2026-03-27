import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log(res.data);

    localStorage.setItem("token", res.data.token);

    if (res.data.user.role === "admin") {
      navigate("/admin/panel");
    } else {
      alert("Not admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <input
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default AdminLogin;