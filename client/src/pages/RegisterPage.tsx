import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";



const RegisterPage = () => {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { name, email, password },
      {
        onSuccess: () => {
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
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {password !== confirmPassword && confirmPassword && (
          <p className="text-red-500 text-sm">
            Passwords do not match
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Register"}
        </button>

        

        <Link
          to="/"
          className="block text-center w-full border border-blue-500 text-blue-500 p-2 rounded-lg hover:bg-blue-50"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;