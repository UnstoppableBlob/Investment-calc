import { useState } from 'react'
import './App.css'

export default function Growth() { 
  const [growth, setGrowth] = useState(0);
  function handleChange(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setGrowth(e.target.value);
  }
  return (
      <div className='growth-div'>
        <form className='growth-form'>
          <label className='growth-label'>Annual Growth(%) <br /></label>
          <input className='growth-input' type='number' onChange={handleChange} value={growth} />%
        </form>
      </div>
  );
}
