import { removeToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid gray",
      }}
    >
      <h2>Task Manager</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;