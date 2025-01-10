import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DashboardLayoutBasic from "../screens/main/DashboardLayoutBasic";
;

function UseIsLoginUser() {
  const { token } = useAuthContext();

  return token === null ? <Navigate to="/login" /> : <DashboardLayoutBasic />;
}

export default UseIsLoginUser;
