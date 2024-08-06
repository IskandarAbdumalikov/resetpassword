import React, { useEffect } from "react";
import "./home.scss";
import { useGetProfileQuery } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const navigate = useNavigate();

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
        <button onClick={() => navigate("/login")}>Login</button>
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
      </div>
    </div>
  );
};

export default Home;
