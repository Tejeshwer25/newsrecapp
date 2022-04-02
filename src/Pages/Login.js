import {useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {Navigate} from "react-router-dom"

import Form from '../Components/form/Form';
import FormHero from '../Components/formHero/FormHero';
import HomeNavigator from "../Components/homeNavigator/HomeNavigator";

import { auth } from "../firebase/firebase";
import {Context} from "../Context/userContext";

function Login({setUserLoggedIn}) {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const {userDetails, setUserDetails} = useContext(Context);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );

      const userID = user.user.uid;

      setUserDetails({...userDetails, email: userData.email, userID: userID});
      sessionStorage.setItem("email", userData.email);
      sessionStorage.setItem("userID", userID);

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
    { userDetails.email === "" ? 
      <>
      <HomeNavigator />

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <Form userData={userData} setUserData={setUserData} setUserLoggedIn={setUserLoggedIn} onSubmit={login} formType="Login"/>

        <FormHero />
      </div>
    </>
    : 
    <Navigate replace to="/welcome" />
  }
  </>
  )
}

export default Login;