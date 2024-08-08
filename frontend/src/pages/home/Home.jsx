import React, { useEffect, useState } from "react";
import "./home.scss";
import { useGetProfileQuery } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";
import EditModule from "../../components/editModule/EditModule";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";

const Home = () => {
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(null);
  const [password, setPassword] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  if (isLoading) return <div>Loading...</div>;

  const { fname, lname, gender, budget, age, username } =
    profile?.payload || {};

  return (
    <div className="profile container">
      <div className="profile-header">
        <h1>Profile</h1>
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => setEdit(profile?.payload)}>Edit</button>
          <button onClick={() => dispatch(logout())}>Log Out</button>
        </div>
      </div>

      <div className="profile-details">
        <p>
          <strong>First Name:</strong> {fname}
        </p>
        <p>
          <strong>Last Name:</strong> {lname}
        </p>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Budget:</strong> ${budget}
        </p>
        <button className="reset-btn" onClick={() => setPassword(true)}>
          Reset password
        </button>
      </div>
      {edit && <EditModule data={edit} setEdit={setEdit} />}
      {edit && <div onClick={() => setEdit(null)} className="overlay"></div>}
      {password ? <ResetPassword handleClose={setPassword} /> : <></>}
      {password ? (
        <div onClick={() => setPassword(false)} className="overlay"></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
