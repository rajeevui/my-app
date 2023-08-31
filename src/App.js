import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(
            'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest'
          );
          const stateData = response.data.data;
          setStates(stateData);
          setLoading(false);
        }, 2000); // Added a 2 second delay to see the API status change from 'Loading' to 'Completed'

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  let filteredStates = states;

  if (filter !== '') {
    filteredStates = states.filter((state) =>
      state.State.toLowerCase().startsWith(filter.toLowerCase())
    );
    filteredStates.sort((a, b) => a.State.localeCompare(b.State)).reverse();
  } else {
    filteredStates.sort((a, b) => a.Population - b.Population);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>US Population Data</h1>
        <p>Status: {loading ? 'Loading...' : 'Completed'}</p>
        <label>
          Filter:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <ul>
          {filteredStates.map((state) => (
            <li key={state.State}>
              {state.State} ({state.Population})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
