import {useState, useEffect} from 'react'

import './App.css';
import WelcomePage from './Pages/WelcomePage';

function App() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('https://gnews.io/api/v4/search?q=example&token=b8c8fd5287a9a34e83e29418c797e06f')
    .then((response) => response.json())
    .then((data) => setApiData(data))
  }, [])

  return (
      <div className="app">
        <WelcomePage data={apiData.articles}/>
      </div>
  );
}

export default App;