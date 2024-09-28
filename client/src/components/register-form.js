import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const userDetails = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  const register = () => {
    axios
      .post("http://localhost:8000/api/register-user", userDetails, config)
      .then((res) => {
        if (res.data.error) {
          setError(true);
          setMessage(res.data.message);
        } else {
          setError(false);
          setMessage(res.data.message);
          resetField();
        }
      });
  };

  const resetField = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <div class="mb-3">
          <label for="first-name" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="last-name" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
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
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
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
            Register
          </button>
        </div>
        <div class="mb-3">
          <a href="/login">Already have an account?</a>
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
        ) : error === false && message !== "" ? (
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> {message}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
