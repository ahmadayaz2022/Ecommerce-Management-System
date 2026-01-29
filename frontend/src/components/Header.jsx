import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () =>  {
  const { logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="font-semibold">Welcome, {role}</h2>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
export default Header;
