import "./App.css";
import { useState, useRef, useEffect } from "react";
import img from "./Images/Codes.png";

function App() {
  //using useState to set the state of two variables
  //also using useRef as shown in examples
  let [name, setName] = useState("");
  let inputRef = useRef();
  let [nationality, setNationality] = useState(null);

  //using useEffect to create auto-focused input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //creating async function to fetch the API with specific name
  async function fetchData() {
    let response = await fetch("https://api.nationalize.io?name=" + name);
    let data = await response.json();
    setNationality(data);
  }

  //function to use in button to trigger the fetch
  function handle() {
    fetchData();
  }

  return (
    <div className="App">
      {/*created a heading*/}
      <h1 style={{ marginTop: "0" }}>What nationality is your name?</h1>

      {/*input element with reference to {inputRef}*/}
      <input
        className="input"
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name here"
      />

      {/*button with trigger function*/}
      <button className="button" onClick={handle}>
        Click
      </button>

      {/*heading that will display if nationality is true and nationality.country is true and if it's not empty*/}
      <h3>
        {nationality &&
          nationality.country &&
          nationality.country.length > 0 && (
            <span key={nationality.country[0].country_id}>
              Country: {nationality.country[0].country_id}
            </span>
          )}
        {/*only displaying first object in array*/}
      </h3>
      <h3>Check table for your country(CC)</h3>
      {/*image of table*/}
      <img src={img}></img>
    </div>
  );
}

export default App;
