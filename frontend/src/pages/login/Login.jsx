import React, { useEffect, useState } from "react";
import "./login.scss";
import { useSignInMutation } from "../../context/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("iskandar");
  const [password, setPassword] = useState("iskandar");
  const [signIn, { isLoading, isError, data, isSuccess }] = useSignInMutation();
  let navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      navigate("/");
      localStorage.setItem("x-auth-token", data.payload);
    }
    if (isError) {
      toast.error("Invalid username or password");
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ username, password });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && <div className="error">Invalid username or password</div>}
      </form>
    </div>
  );
};

export default Login;
