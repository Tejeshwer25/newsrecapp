import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./CategoryNews.module.css";
import Navbar from "../Components/navbar/Navbar";
import Cards from "../Components/cards/Cards";

const CategoryNews = () => {
  const { category } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await fetch(
      `https://gnews.io/api/v4/top-headlines?&token=b8c8fd5287a9a34e83e29418c797e06f&lang=en&topic=${category}&max=100`
    )
      .then((data) => data.json())
      .then((data) => setData(data.articles));
  }

  return (
    <div>
      <Navbar />

      <div className={styles.categoryNews}>
        <h2>{category.toUpperCase()} NEWS</h2>

        <div className={styles.categoryNews__container}>
          {data
            .map((data) => {
              return {
                title: data.title,
                description: data.description,
                url: data.url,
                image: data.image,
              };
            })
            .map((data, index) => {
              console.log(data);
              return <Cards data={data} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
