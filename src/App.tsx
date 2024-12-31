import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./screens/auth/userLogin/LoginUser";
import UserSignUpScreen from "./screens/auth/userSignUp/SingUpScreen";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginUser />} />
      <Route path="/signup" element={<UserSignUpScreen />} />
    </Routes>
  );
}

export default App;
