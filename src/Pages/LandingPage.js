import { useState, useEffect } from "react";
import { set, refFromURL } from "firebase/database";

import Navbar from "../Components/navbar/Navbar";

import { myDb } from "../firebase/firebase";

import styles from "./LandingPage.module.css";
import TopicCard from "../Components/topicCard/TopicCard";
import Cards from "../Components/cards/Cards";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
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

  const [categoriesChoosen, setCategoriesChoosen] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [userID, setUserID] = useState(sessionStorage.getItem("userID"));

  useEffect(() => {
    let tempTopicsChoosen = sessionStorage.getItem("topicsChoosen");
    tempTopicsChoosen = tempTopicsChoosen ? tempTopicsChoosen.split(",") : [];

    setCategoriesChoosen(tempTopicsChoosen);

    console.log(categoriesChoosen);

    getNewsData(
      categoriesChoosen.length > 0 ? categoriesChoosen : tempTopicsChoosen
    );
  }, []);

  const getNewsData = async (topics) => {
    let currentData = [];
    let currentAPIs = [];

    for (let i = 0; i < topics.length; i++) {
      await fetch(
        `https://gnews.io/api/v4/top-headlines?&token=b8c8fd5287a9a34e83e29418c797e06f&lang=en&topic=${topics[i]}&max=100`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          currentAPIs.push(data.articles);
          console.log(data);
        });
    }

    for (let i = 0; i < currentAPIs.length; i++) {
      currentData = [...currentData, ...currentAPIs[i]];
    }

    currentData = shuffle(currentData);
    console.log(currentData);

    // console.log(currentData.length);
    setNewsData(currentData.length > 0 ? currentData : newsData);
    // console.log(newsData);
    // console.log(newsData.length);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div>
      <Navbar />

      <div className={styles.LandingPage}>
        <div className={styles.LandingPage__title}>
          <div className={styles.LandingPage__section}>
            <h2>Select a topic to explore: </h2>
            <div className={styles.topicCards__Container}>
              {categoriesChoosen.length > 0 ? (
                categoriesChoosen.map((category) => (
                  <TopicCard topicName={category} />
                ))
              ) : (
                <h3>No topics selected</h3>
              )}
            </div>
          </div>

          <div className={styles.LandingPage__section}>
            <h2>View Specially Curated News: </h2>
            <div className={styles.NewsSection}>
              {newsData
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
      </div>
    </div>
  );
};

export default LandingPage;
