import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { set, refFromURL } from "firebase/database";

import Navbar from "../Components/navbar/Navbar";
import CategoryPicker from "../Components/categoryPicker/CategoryPicker";
import { myDb } from "../firebase/firebase";

import { Context } from "../Context/userContext";

const CategoryPickerPage = () => {
  const categories = [
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
    "breaking-news",
    "world",
    "nation",
  ];
  const userID = sessionStorage.getItem("uid");

  const [categoriesChoosen, setCategoriesChoosen] = useState([]);

  const { userDetails, setUserDetails } = useContext(Context);

  const addCategoryToDatabase = () => {
    const categoryContainer = categoriesChoosen;
    try {
      set(
        refFromURL(
          myDb,
          `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userID}/categoriesChoosen`
        ),
        categoryContainer
      );

      sessionStorage.setItem("topicsChoosen", categoryContainer);
      setUserDetails({ ...userDetails, topicsChoosen: categoryContainer });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div>
        <CategoryPicker
          categories={categories}
          addCategoryToDatabase={addCategoryToDatabase}
          categoriesChoosen={categoriesChoosen}
          setCategoriesChoosen={setCategoriesChoosen}
        />
      </div>

      {sessionStorage.getItem("topicsChoosen") || userDetails.topicsChoosen ? (
        <Navigate replace to="/welcome" />
      ) : (
        ""
      )}
    </div>
  );
};

export default CategoryPickerPage;
