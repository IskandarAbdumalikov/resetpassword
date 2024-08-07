import React, { useState } from "react";
import { useResetPasswordMutation } from "../../context/api/userApi";
import "./resetPassword.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = ({ handleClose }) => {
  const [passwords, setPasswords] = useState({ password: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { data, isLoading, isSuccess }] =
    useResetPasswordMutation();

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(passwords);
    if (isSuccess) {
      handleClose();
    }
  };

  return (
    <form className="resetPassword" onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={passwords.password}
        onChange={handleChange}
      />
      <div className="password__input">
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <button
          type="button"
          className="showButton"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="buttons">
        <button type="submit" disabled={isLoading} className="submitButton">
          {isLoading ? "Loading..." : "Reset Password"}
        </button>
        <button
          type="button"
          className="cancelButton"
          onClick={() => handleClose()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
