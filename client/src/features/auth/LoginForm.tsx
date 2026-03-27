import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { saveToken } from "../../utils/token";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          saveToken(data.token);
          navigate("/tasks");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Login"}
        </button>

        {/* register link */}
        <Link
          to="/register"
          className="block text-center w-full border border-blue-500 text-blue-500 p-2 rounded-lg hover:bg-blue-50"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;