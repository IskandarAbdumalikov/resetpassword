import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../context/api/userApi";

const EditModule = ({ data, setEdit }) => {
  const [formState, setFormState] = useState({
    fname: data?.fname || "",
    lname: data?.lname || "",
    gender: data?.gender || "",
    budget: data?.budget || 0,
    age: data?.age || "",
    username: data?.username || "",
  });

  const [updateProfile, { isLoading, isSuccess, isError }] =
    useUpdateProfileMutation();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, gender, budget, age, username } = formState;
    const body = { fname, lname, gender, budget, age, username };
    await updateProfile({ id: data._id, body });
    setEdit(false);
  };

  return (
    <div className="edit__module">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={formState.fname}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={formState.lname}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formState.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Budget:
          <input
            type="number"
            name="budget"
            value={formState.budget}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formState.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Update Profile
        </button>
        <button type="button" onClick={() => setEdit(null)}>
          Cancel
        </button>
        {isSuccess && <p>Profile updated successfully!</p>}
        {isError && <p>There was an error updating the profile.</p>}
      </form>
    </div>
  );
};

export default EditModule;
