import { useState } from 'react'
import './App.css'

export default function DIP() { 
  const [dip, setdip] = useState(0);
  function handleChange(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setdip(e.target.value);
  }
  return (
      <div className='dip-div'>
        <form className='dip-form'>
          <label className='dip-label'>Daily Investment Period(Years)<br /> $</label>
          <input className='dip-input' type='number' onChange={handleChange} value={dip} />
        </form>
      </div>
  );
}