import React, { useEffect, useState } from "react";
import "./login.scss";
import { useSignInMutation } from "../../context/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../context/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("iskandar");
  const [password, setPassword] = useState("iskandar");
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { isLoading, isError, data, isSuccess }] = useSignInMutation();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let isLogin = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      navigate("/");
      dispatch(setToken(data?.payload));
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
          <div className="password__input">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="showButton"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
