import {useState} from 'react';

import Form from "../Components/form/Form";
import FormHero from '../Components/formHero/FormHero';
import HomeNavigator from "../Components/homeNavigator/HomeNavigator";

const SignUp = ({setUserLoggedIn}) => {

  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  return (
    <>
      <HomeNavigator />

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
          <Form userData={userdata} setUserData={setUserData} setUserLoggedIn={setUserLoggedIn} formType="Register"/>
        

        <FormHero />
      </div>
    </>
  )
}

export default SignUp;