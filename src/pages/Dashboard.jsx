import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import api from "../Api/axios"

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }
    logout();
    navigate("/login");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

