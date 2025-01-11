import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function UseIsLoginUser() {
  const { token } = useAuthContext();

  return token === null ? <Navigate to="/login" /> : <Outlet />;
}

export default UseIsLoginUser;
