import {useState} from "react";
import CategoryPicker from "../Components/categoryPicker/CategoryPicker";
import Navbar from "../Components/navbar/Navbar";

import styles from "./LandingPage.module.css";

const LandingPage = () => {

  const categories = ["breaking-news", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"];
  const [categoriesChoosen, setCategoriesChoosen] = useState([]);

  return (
    <div>
      <Navbar />

      <div className={styles.LandingPage}>

        <div className={styles.LandingPage__categories}>
          <CategoryPicker categories={categories} categoriesChoosen={categoriesChoosen} setCategoriesChoosen={setCategoriesChoosen}/>
        </div>


        <div className={styles.LandingPage__title}>


        </div>
      </div>
    </div>
  )
}

export default LandingPage;