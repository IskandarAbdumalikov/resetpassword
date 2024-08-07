import React from "react";

const HeaderResults = ({ data }) => {
  console.log(data);

  return (
    <div className="header-results">
      {data?.payload?.map((item) => (
        <div key={item._id} className="search__card">
          <h3>{item.fname}</h3>
          <p>{item.username}</p>
          <p>{item.budget}</p>
          <p>{item.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default HeaderResults;
