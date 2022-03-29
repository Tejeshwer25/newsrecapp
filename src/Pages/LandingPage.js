import { useState, useEffect, useContext } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { set, refFromURL, onValue } from "firebase/database";

import CategoryPicker from "../Components/categoryPicker/CategoryPicker";
import Navbar from "../Components/navbar/Navbar";

import { auth, db, myDb } from "../firebase/firebase";
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

  const [user] = useAuthState(auth);

  const { userDetails, setUserDetails } = useContext(Context);

  const [categoriesChoosen, setCategoriesChoosen] = useState([]);
  const [showCategoryWindow, setShowCategoryWindow] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [userID, setUserID] = useState(user?.uid);

  console.log(userID);

  useEffect(() => {
    setUserID(user?.uid);
    fetchUsername();
    
    setUserID(user?.uid);
    getTopicsInDatabase();

    setUserID(user?.uid);
    let tempTopicsChoosen = sessionStorage.getItem("topicsChoosen");
    tempTopicsChoosen = tempTopicsChoosen ? tempTopicsChoosen.split(",") : [];
    
    setCategoriesChoosen(tempTopicsChoosen);

    getNewsData(categoriesChoosen.length>0 ? categoriesChoosen : userDetails.topicsChoosen.split(","));

  }, []);

  const fetchUsername = async () => {
    // Fetches the Username from firebase firestore
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      console.log(doc)
      const data = doc.docs[0].data();

      setUserDetails({ ...userDetails, name: data.name, userId: user?.uid });
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("userId", user?.uid);

      return user?.uid;

    } catch (err) {
      console.error(err);
    }
  };

  const getTopicsInDatabase = async () => {
    // Gets the topics already stored in the database
    if (user) {
      onValue(
        refFromURL(
          myDb,
          `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userDetails.userId}`
        ),
        async (snapshot) => {
          const data = await snapshot.val();
          console.log(data);

          let categoriesAlreadyChoosen = data
            ? data.categoriesChoosen
              ? data.categoriesChoosen
              : []
            : [];

          console.log(categoriesAlreadyChoosen);

          setUserDetails({
            ...userDetails,
            topicsChoosen: categoriesAlreadyChoosen,
          });
          sessionStorage.setItem("topicsChoosen", categoriesAlreadyChoosen);

          if((userDetails.topicsChoosen === "") && (sessionStorage.getItem("topicsChoosen") == "")) setShowCategoryWindow(true);
        }
      );
    }
  };

  const getNewsData = (topics) => {
    let currentData = [];
    let currentAPIs = [];

    currentAPIs = topics.map((topic) => {
      return `https://newsapi.org/v2/top-headlines?category=${topic}&apiKey=bbd4a97c4e77492ea5e40af254ebf2f9&language=en`;
    });

    Promise.all(
      currentAPIs.map((api) => {
        return fetch(api);
      })
    )
      .then((res) => {
        return Promise.all(res.map((res) => res.json()));
      })
      .then((data) => data.map((item) => item.articles))
      .then((data) => data.forEach((item) => currentData.push(...item)));

    setNewsData(currentData);
    console.log(newsData);
  };

  const addCategoryToDatabase = (e) => {
    const categoryContainer = categoriesChoosen;
    if (!categoryContainer.includes(e.target.innerText)) {
      try {
        const userId = userDetails.userId;
        console.log(userId);

        set(
          refFromURL(
            myDb,
            `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}/categoriesChoosen`
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
              showCategoryWindow && userDetails.topicsChoosen.length <= 0
                ? ""
                : "none"
            }`,
          }}
        >
          <CategoryPicker
            categories={categories}
            categoriesChoosen={categoriesChoosen}
            setCategoriesChoosen={setCategoriesChoosen}
            addCategoryToDatabase={addCategoryToDatabase}
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
                : userDetails.topicsChoosen.split(",").length > 0 
                  ? userDetails.topicsChoosen.split(",").map((category) => 
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
