import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import './App.css';

import WelcomePage from './Pages/WelcomePage';
import Login from './Pages/Login';
import Register from './Pages/SignUp'
import LandingPage from './Pages/LandingPage';
import {Context} from './Context/userContext';

function App() {

  const [apiData, setApiData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : "",
    name: sessionStorage.getItem("name") ? sessionStorage.getItem("name") : "",
    email: sessionStorage.getItem("email") ? sessionStorage.getItem("email") : "",
    topicsChoosen: sessionStorage.getItem("topicsChoosen") ? sessionStorage.getItem("topicsChoosen") : [],
  });

  useEffect(() => {
    fetch('https://gnews.io/api/v4/top-headlines?&token=b8c8fd5287a9a34e83e29418c797e06f&lang=en')
    .then((response) => response.json())
    .then((data) => setApiData(data))
  }, [])

  return (
    <Context.Provider value={{userDetails, setUserDetails}}>
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/welcome" element={<LandingPage />} />

          <Route exact path="/login" element={<Login setUserLoggedIn={setUserLoggedIn}/>} />
          
          <Route exact path="/register" element={<Register setUserLoggedIn={setUserLoggedIn}/>} />
          
          <Route path="/" element={<WelcomePage data={apiData.articles}/>} />
        </Routes>
      </div>
    </Router>
    </Context.Provider>
  );
}

export default App;