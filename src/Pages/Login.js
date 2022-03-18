import {useState} from 'react';

import Form from '../Components/form/Form';
import FormHero from '../Components/formHero/FormHero';
import HomeNavigator from "../Components/homeNavigator/HomeNavigator";

function Login() {

  const [userData, setUserData] = useState({
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
          <Form userData={userData} setUserData={setUserData} formType="Login"/>
        

        <FormHero />
      </div>
    </>
  )
}

export default Login;