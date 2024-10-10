import { useEffect, useState } from "react";
import axios from "axios";
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useNavigate } from 'react-router-dom'


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const signIn = useSignIn()
  const navigate = useNavigate()

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const userDetails = JSON.stringify({
    email: email,
    password: password,
  });

  const register = () => {
    axios
      .post("http://localhost:8000/api/login-user", userDetails, config)
      .then((res) => {
        let result = res.data
        if(result.success) {
          if(signIn({
            auth: {
              token: result.token,
              type: "Bearer"
            },
            userState: { 
              id: result.user.id,
              email: result.user.email,
              role: result.user.role
            }
          })) {
            navigate("/")
          }
        } else if (!result.success) {
          setError(true)
          setMessage(result.message)
        }
      });
  };

  return (
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-success" onClick={register}>
            Login
          </button>
        </div>
        <div class="mb-3">
          <a href="/register">Don't have an account?</a>
        </div>
        {error ? (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Error!</strong> {message}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : ""
        }
      </div>
    </div>
  );
}

export default LoginForm;
