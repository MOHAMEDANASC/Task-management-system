import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx"
import TaskPage from "../pages/TaskPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminLogin from "../pages/AdminLogin";
import AdminPanel from "../pages/AdminPanel";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>  );
};

export default AppRoutes;