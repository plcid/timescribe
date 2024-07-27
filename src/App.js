import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (window.pywebview) {
        const data = await window.pywebview.api.get_data();
        setMessage(data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message || 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;