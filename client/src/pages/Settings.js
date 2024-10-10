import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import axios from "axios";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import useSignOut from "react-auth-kit/hooks/useSignOut";

function Settings() {
  const [newPassword, setNewPassword] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = JSON.stringify({
    user_id: auth.id,
    password: newPassword
  })

  const changePassword = () => {
    axios.post("http://localhost:8000/api/change-password", data, config)
        .then(result => {
            if(result.data.success) {
                setNewPassword("")
                signOut()
                navigate('/login')
                toast.success("Your password has been changed!")
            } else {
                toast.error("There was an error changing your password!")
            }
        })
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavBar />

      <div className="container main-holder">
        <h2>Settings</h2>
        <hr />

        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
            Change Password
        </label>
        <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={newPassword}
            onChange={(e) => {
            setNewPassword(e.target.value);
            }}
        />
        <div id="emailHelp" class="form-text">
            You will be logged out after changing your password.
        </div>
        </div>
        <button type="submit" class="btn btn-success" onClick={changePassword}>
            Change Password
        </button>
      </div>
      <Toaster />
    </>
  );
}

export default Settings;
