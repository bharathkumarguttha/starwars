import { useState } from 'react';
import './App.scss';
import { convertStringToNumber } from './utils';
import Loader from './Loader';
import Ships from './Ships';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getStarships = async () => {
    try {
      setLoading(true);
      let apiURL = `https://swapi.dev/api/starships/`;
      let data = [];
      while (apiURL) {
        const response = await fetch(apiURL);
        const parsedResponse = await response.json();
        data = data.concat(parsedResponse.results);
        apiURL = parsedResponse.next;
      }
      data = data.map(ship => {
        return {
          ...ship,
          crew: convertStringToNumber(ship.crew)
        }
      }).filter(ship => ship.crew < 10).sort((a, b) => a.crew - b.crew);
      setStarships(data);
      setLoading(false);
    }
    catch (e) {
      setError("Failed to fetch data from API")
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className='header--title'>Star Wars</h1>
      </header>
      <div className="sub-header">
        Sample React JS project using SWAPI API.
      </div>
      <div className="starship--meta-info">
        <p>Results are filtered to starships with a crew size less than 10 and sorted by crew size</p>
        <p>The starship that has featured in the most films will show a
          <FontAwesomeIcon icon={faTrophy} />
        </p>
      </div>
      <button disabled={loading} className='cta--get-starships' onClick={getStarships}>Get Starships</button>
      {loading && <Loader />}
      {(!loading && !error) && <Ships ships={starships} />}
      {error && <h3>{error}</h3>}
    </div>
  );
}

export default App;
