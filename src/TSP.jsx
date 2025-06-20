import { useState } from 'react'
import './App.css'

export default function TSP() { 
  const [tsp, setTSP] = useState(0);
  function handleChange(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setTSP(e.target.value);
  }
  return (
      <div className='tsp-div'>
        <form className='tsp-form'>
          <label className='tsp-label'>Total Simulation Period(Years) <br /></label>
          <input className='tsp-input' type='number' onChange={handleChange} value={tsp} />
        </form>
      </div>
  );
}