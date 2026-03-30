import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { saveToken } from "../utils/token";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(""); // clear old errors

    login(
      { email, password },
      {
        onSuccess: (data) => {
          saveToken(data.token);
          navigate("/tasks");
        },

        onError: (err: any) => {
          const data = err.response?.data;

          // ✅ Handle Zod validation errors (array)
          if (Array.isArray(data)) {
            const messages = data.map((e: any) => e.message).join(", ");
            setErrorMessage(messages);
          }
          // ✅ Handle normal backend error
          else {
            setErrorMessage(data?.message || "Login failed");
          }
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

        {/* ✅ Clean Error UI */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Login"}
        </button>

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

export default LoginPage;