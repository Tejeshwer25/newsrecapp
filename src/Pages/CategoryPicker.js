import React from "react";
import Navbar from "../Components/navbar/Navbar";

const CategoryPicker = () => {
  return (
    <div>
      <Navbar />
      Choose your areas of interest
      {console.log(sessionStorage.getItem("topicsChoosen").length)}
    </div>
  );
};

export default CategoryPicker;
