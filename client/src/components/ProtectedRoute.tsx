import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;