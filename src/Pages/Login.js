import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { refFromURL, onValue } from "firebase/database";

import Form from "../Components/form/Form";
import FormHero from "../Components/formHero/FormHero";
import HomeNavigator from "../Components/homeNavigator/HomeNavigator";

import { auth, myDb } from "../firebase/firebase";
import { Context } from "../Context/userContext";

function Login({ setUserLoggedIn }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { userDetails, setUserDetails } = useContext(Context);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const userID = user.user.uid;

      getTopicsInDatabase(userID);

      setUserDetails({ ...userDetails, email: userData.email, userID: userID });
      sessionStorage.setItem("email", userData.email);
      sessionStorage.setItem("userID", userID);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopicsInDatabase = (userID) => {
    // Gets the topics already stored in the database
    if (userID) {
      onValue(
        refFromURL(
          myDb,
          `https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app/${userID}`
        ),
        async (snapshot) => {
          const data = snapshot.val();

          let categoriesAlreadyChoosen = data ? data.categoriesChoosen : [];

          console.log(categoriesAlreadyChoosen);

          setUserDetails({
            ...userDetails,
            topicsChoosen: categoriesAlreadyChoosen,
          });
          sessionStorage.setItem("topicsChoosen", categoriesAlreadyChoosen);

          if (categoriesAlreadyChoosen.length <= 0) {
            console.log("here");
            return <Navigate replace to="/chooseAreasOfInterest" />;
          }
        }
      );
    } else {
      console.log("No User");
    }
  };

  return (
    <>
      {userDetails.email === "" ? (
        <>
          <HomeNavigator />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Form
              userData={userData}
              setUserData={setUserData}
              setUserLoggedIn={setUserLoggedIn}
              onSubmit={login}
              formType="Login"
            />

            <FormHero />
          </div>
        </>
      ) : (
        <Navigate replace to="/chooseAreasOfInterest" />
      )}
    </>
  );
}

export default Login;
