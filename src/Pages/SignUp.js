import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Navigate } from "react-router-dom";

import Form from "../Components/form/Form";
import FormHero from "../Components/formHero/FormHero";
import HomeNavigator from "../Components/homeNavigator/HomeNavigator";

import { auth, db } from "../firebase/firebase";
import { Context } from "../Context/userContext";

const SignUp = ({ setUserLoggedIn }) => {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { userDetails, setUserDetails } = useContext(Context);

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userdata.email,
        userdata.password
      );

      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: userdata.name,
        email: userdata.email,
        authProvider: "local",
      });

      setUserDetails({ ...userDetails, email: userdata.email, uid: user.uid });
      sessionStorage.setItem("email", userdata.email);
      sessionStorage.setItem("uid", user.uid);

      <Navigate replace to="/chooseAreasOfInterest" />;
    } catch (error) {
      console.log(error.message);
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
              userData={userdata}
              setUserData={setUserData}
              setUserLoggedIn={setUserLoggedIn}
              onSubmit={register}
              formType="Register"
            />

            <FormHero />
          </div>
        </>
      ) : (
        <Navigate replace to="/chooseAreasOfInterest" />
      )}
    </>
  );
};

export default SignUp;
