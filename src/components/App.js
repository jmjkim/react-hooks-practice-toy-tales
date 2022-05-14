import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [arrayOfToys, setArrayOfToys] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(response => response.json())
    .then(setArrayOfToys)
    .catch(error => alert(error.message))
    .finally(console.log("Data fetched successfully."))
  }, []);

  const handleAddToyClick = () => {
    setShowForm((showForm) => !showForm);
  }

  const handleLikesClick = (updateToy) => {
    const updatedToys = arrayOfToys.map(toy => {
      if (toy.id === updateToy.id) return updateToy
      else return toy
    })

    setArrayOfToys(updatedToys);
  }

  const handleFormSubmit = (newToy) => {
    setArrayOfToys([...arrayOfToys, newToy]);
  };

  const handleAvailableToys = (donatedToy) => {
    const availableToys = arrayOfToys.filter(toy => toy.id !== donatedToy.id);
    setArrayOfToys(availableToys);
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleFormSubmit={handleFormSubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleAddToyClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={arrayOfToys} onLikesClick={handleLikesClick} onDonateClick={handleAvailableToys}/>
    </>
  );
}

export default App;
