import './App.css';
import { useState } from 'react';

function App() {

  const [num, setNum] = useState(0);
  fetch("http://localhost:4000").then(r=>r.text()).then(setNum);
  

  return (
    <div className="App">
      {num}
    </div>
  );
}

export default App;
