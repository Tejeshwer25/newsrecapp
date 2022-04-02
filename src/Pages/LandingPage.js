import { useState, useEffect, useContext } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { set, refFromURL, onValue } from "firebase/database";

import CategoryPicker from "../Components/categoryPicker/CategoryPicker";
import Navbar from "../Components/navbar/Navbar";

import { myDb } from "../firebase/firebase";
import { Context } from "../Context/userContext";

import styles from "./LandingPage.module.css";
import TopicCard from "../Components/topicCard/TopicCard";
import Cards from "../Components/cards/Cards";

const LandingPage = () => {
  const categories = [
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
    "general",
  ];


  const { userDetails, setUserDetails } = useContext(Context);

  const [categoriesChoosen, setCategoriesChoosen] = useState([]);
  const [showCategoryWindow, setShowCategoryWindow] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [userID, setUserID] = useState(sessionStorage.getItem("userID"));

  useEffect(() => {    
    getTopicsInDatabase();

    let tempTopicsChoosen = sessionStorage.getItem("topicsChoosen");
    tempTopicsChoosen = tempTopicsChoosen ? tempTopicsChoosen.split(",") : [];
    
    setCategoriesChoosen(tempTopicsChoosen);

    console.log(showCategoryWindow);
    console.log(categoriesChoosen);

  
    getNewsData(categoriesChoosen.length>0 ? categoriesChoosen : tempTopicsChoosen);

  }, []);

  const getTopicsInDatabase = async () => {
    // Gets the topics already stored in the database
    if (userID) {
      onValue(
        refFromURL(
          myDb,
          `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userID}`
        ),
        async (snapshot) => {
          const data = await snapshot.val();
          // console.log(data.categoriesChoosen);

          let categoriesAlreadyChoosen = data
            ? data.categoriesChoosen
            : [];

          console.log(categoriesAlreadyChoosen);

          setUserDetails({
            ...userDetails,
            topicsChoosen: categoriesAlreadyChoosen,
          });
          sessionStorage.setItem("topicsChoosen", categoriesAlreadyChoosen);

          if(categoriesAlreadyChoosen.length>0) {
            setShowCategoryWindow(false)
          }
        }
      );
    }
    else {
      console.log("No User")
    }
  };



  const getNewsData = async (topics) => {
    let currentData = [];
    let currentAPIs = [];

    for(let i=0; i<topics.length; i++) {
      await fetch(`https://newsapi.org/v2/top-headlines?category=${topics[i]}&apiKey=bbd4a97c4e77492ea5e40af254ebf2f9&language=en`)
      .then(data => {
        return data.json()
      })
      .then(data => {
        currentAPIs.push(data.articles);
        console.log(data)
      })
    }

    for(let i=0; i<currentAPIs.length; i++) {
      currentData = [...currentData, ...currentAPIs[i]];
    }

    currentData = shuffle(currentData);
    console.log(currentData)

    // console.log(currentData.length);
    setNewsData(currentData.length>0 ? currentData : newsData);
    // console.log(newsData);
    // console.log(newsData.length);
  };

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const addCategoryToDatabase = (e) => {
    const categoryContainer = categoriesChoosen;
    if (!categoryContainer.includes(e.target.innerText)) {
      try {

        set(
          refFromURL(
            myDb,
            `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userID}/categoriesChoosen`
          ),
          [...categoryContainer, e.target.innerText]
        );
      } catch (error) {
        console.log(error);
      }
      setCategoriesChoosen([...categoryContainer, e.target.innerText]);
    }

    console.log(categoriesChoosen);
  };


  return (
    <div>
      <Navbar />

      <div className={styles.LandingPage}>
        <div
          className={styles.LandingPage__categories}
          style={{
            display: `${
              showCategoryWindow
                ? ""
                : "none"
            }`,
          }}
        >{console.log(showCategoryWindow)}
          <CategoryPicker
            categories={categories}
            categoriesChoosen={categoriesChoosen}
            setCategoriesChoosen={setCategoriesChoosen}
            addCategoryToDatabase={addCategoryToDatabase}
            setShowCategoryWindow={setShowCategoryWindow}
          />
        </div>

        <div className={styles.LandingPage__title}>
          <div className={styles.LandingPage__section}>
            <h2>Select a topic to explore: </h2>
            <div className={styles.topicCards__Container}>
              {
                categoriesChoosen.length > 0 
                ? categoriesChoosen.map((category) => 
                    <TopicCard topicName={category} />  
                  )
                  : <h3>No topics selected</h3>
              }
            </div>
          </div>

          <div className={styles.LandingPage__section}>
            <h2>View Specially Curated News: </h2>
            <div className={styles.NewsSection}>
              {
                newsData.map(data => { 
                  return {
                        title: data.title,
                        description: data.description,
                        url: data.url,
                        image: data.urlToImage
                  }}
                ).map((data, index) => {
                  console.log(data);
                  return <Cards data={data} key={index}/>})
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
