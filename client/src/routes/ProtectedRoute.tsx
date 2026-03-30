import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;