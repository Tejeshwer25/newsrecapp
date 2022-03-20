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

function App() {

  const [apiData, setApiData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: ""
  });

  useEffect(() => {
    fetch('https://gnews.io/api/v4/search?q=example&token=b8c8fd5287a9a34e83e29418c797e06f')
    .then((response) => response.json())
    .then((data) => setApiData(data))
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />

          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn}/>} />
          
          <Route path="/register" element={<Register setUserLoggedIn={setUserLoggedIn}/>} />
          
          <Route path="/" element={<WelcomePage data={apiData.articles}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;