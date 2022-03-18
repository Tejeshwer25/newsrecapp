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

function App() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('https://gnews.io/api/v4/search?q=example&token=b8c8fd5287a9a34e83e29418c797e06f')
    .then((response) => response.json())
    .then((data) => setApiData(data))
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/" element={<WelcomePage data={apiData.articles}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;