import React, { useState } from "react";
import { useGetUsersBySearchQuery } from "../../context/api/userApi";
import "./header.scss";
import { MdCancel } from "react-icons/md";
import HeaderResults from "./HeaderResults";
import { useLocation } from "react-router-dom";
const Header = () => {
  let [value, setValue] = useState("");
  let { data } = useGetUsersBySearchQuery({ value: value.trim() });

  let { pathname } = useLocation();
  if (pathname == "/login") {
    return <></>;
  }

  return (
    <header className="header container">
      <form action="">
        <input
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
        />
        {value.trim() ? (
          <button
            className="cancel-btn"
            onClick={() => setValue("")}
            type="button"
          >
            <MdCancel />
          </button>
        ) : (
          <></>
        )}
        <button>Search</button>
      </form>
      {value.trim() ? <HeaderResults data={data} /> : <></>}
    </header>
  );
};

export default Header;
