import { useState } from "react";
import "./App.css";

export default function Initial() {
  const [initial, setInitial] = useState(0);
  function handleChange(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setInitial(e.target.value);
  }
  return (
    <div className="initial-div">
      <form className="initial-form">
        <label className="initial-label">
          Initial Investment
          <br /> $
        </label>
        <input
          className="initial-input"
          type="number"
          onChange={handleChange}
          value={initial}
        />
      </form>
    </div>
  );
}
