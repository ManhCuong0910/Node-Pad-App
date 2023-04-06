import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./submit.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Cookies from "js-cookie";
function Submit() {
  const [isLogin, setIsLogin] = useState(true);
  const changeDisplay = () => {
    setIsLogin((prev) => !prev);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const checktoken = async (token) => {
      try {
        const res = await axios.get(
          "https://backoffice.nodemy.vn/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if ((res.status = 200)) {
          navigate("/todoapp");
        }
      } catch (error) {}
    };

    checktoken(jwt);
  }, []);
  return (
    <div className="login-box d-flex justify-content-center align-items-center">
      <div className="login">
      <h2>LOGIN</h2>
      {/* <button onClick={changeDisplay}>Đăng Ký</button> */}
      {isLogin ? (
        <LoginForm login={isLogin}></LoginForm>
      ) : (
        <RegisterForm logIn={isLogin}></RegisterForm>
      )}
      </div>
    </div>
  );
}
export default Submit;
