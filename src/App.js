import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";

import "./App.css";

import WelcomePage from "./Pages/WelcomePage";
import Login from "./Pages/Login";
import Register from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import { Context } from "./Context/userContext";
import CategoryPicker from "./Pages/CategoryPicker";
import CategoryNews from "./Pages/CategoryNews";
import UserProfile from "./Pages/UserProfile";

function App() {
  const [apiData, setApiData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: sessionStorage.getItem("userId")
      ? sessionStorage.getItem("userId")
      : "",
    name: sessionStorage.getItem("name") ? sessionStorage.getItem("name") : "",
    email: sessionStorage.getItem("email")
      ? sessionStorage.getItem("email")
      : "",
    topicsChoosen: sessionStorage.getItem("topicsChoosen")
      ? sessionStorage.getItem("topicsChoosen")
      : [],
  });

  const alanKey =
    "793b26c9b3d44833fb10f94b0f1e38b12e956eca572e1d8b807a3e2338fdd0dc/stage";

  useEffect(() => {
    fetch(
      "https://gnews.io/api/v4/top-headlines?&token=b8c8fd5287a9a34e83e29418c797e06f&lang=en"
    )
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newNews") {
          console.log(articles);
        }
      },
    });
  }, []);

  return (
    <Context.Provider value={{ userDetails, setUserDetails }}>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/welcome" element={<LandingPage />} />

            <Route
              exact
              path="/chooseAreasOfInterest"
              element={<CategoryPicker />}
            />

            <Route exact path="/userProfile" element={<UserProfile />} />

            <Route path="/welcome/:category" element={<CategoryNews />} />

            <Route
              exact
              path="/login"
              element={<Login setUserLoggedIn={setUserLoggedIn} />}
            />

            <Route
              exact
              path="/register"
              element={<Register setUserLoggedIn={setUserLoggedIn} />}
            />

            <Route path="/" element={<WelcomePage data={apiData.articles} />} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
