import LoginForm from "../components/login-form";
import NavBar from "../components/navbar";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="container register-login-form-container">
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
