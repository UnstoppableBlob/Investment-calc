import { useState } from 'react'
import './App.css'

export default function Rate() { 
  const [rate, setRate] = useState(0);
  function handleChange(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setRate(e.target.value);
  }
  return (
      <div className='rate-div'>
        <form className='rate-form'>
          <label className='rate-label'>Daily Investment<br /> $</label>
          <input className='rate-input' type='number' onChange={handleChange} value={rate} />
        </form>
      </div>
  );
}