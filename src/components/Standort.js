import React from 'react';
import '../standort.css';

const Standort = () => {
  const states = [
    {
      name: 'Baden-Württemberg',
      cities: ['Geislingen', 'Heidenheim', 'Baden-Baden']
    },
    {
      name: 'Berlin',
      cities: ['Kreuzberg', 'Berlin-Haputbahnhof', 'Berlin-Flughafen']
    },
    {
      name: 'Bremen',
      cities: ['Mandorf', 'Bremen-Hauptbahnhof', 'Bremen-Flughafen']
    },
    {
      name: 'Hamburg',
      cities: ['Wilhemsburg', 'Hamburg-Hauptbahnhof', 'Hamburg-Flughafen']
    },
    {
      name: 'Niedersachsen',
      cities: ['Hannover-Flughafen', 'Braunschweig-Hauptbahnhof', 'Osnabrück-Hauptbahnhof']
    },
    {
      name: 'Saarland',
      cities: ['Saarbrücken', 'Saarbrücken-Hauptbahnhof', 'Schwalbach']
    }
  ];

  const sortedStates = states.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="germany-states">
      {sortedStates.map((state, index) => (
        <div key={index} className="state">
          <h3 className="state-name">{state.name}</h3>
          <ul className="cities-list">
            {state.cities.sort().map((city, cityIndex) => (
              <li key={cityIndex} className="city">{city}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Standort;