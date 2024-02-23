import { useState } from 'react';

import './App.css';
import Set from './components/Set';

import { SETS } from './constants/sets';

function App() {
  const [currentSet, setCurrentSet] = useState('');
  const [sKey, setSKey] = useState(0);

  const genNewKey = () => {
    setSKey((key) => key + 1);
  };

  return (
    <>
      <nav>
        {Object.keys(SETS).map((key) => (
          <button
            onClick={() => {
              setCurrentSet(key);
              genNewKey();
            }}
            key={key}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </nav>
      {currentSet && (
        <>
          <h3>{currentSet.toUpperCase()}</h3>
          <Set terms={SETS[currentSet]} key={sKey} retry={genNewKey} />
        </>
      )}
    </>
  );
}

export default App;
