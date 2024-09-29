import NavBar from "../components/navbar";
import RegisterForm from "../components/register-form";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Register() {
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
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
