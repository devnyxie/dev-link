import React, { useState } from 'react';
import './Test.css';
function Test() {
  const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div>
      <button onClick={toggleDiv}>Toggle Div</button>
      {showDiv && <div className='fade-in'>This div will fade in/out</div>}
    </div>
  );
}

export default Test;
