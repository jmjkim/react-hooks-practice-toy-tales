import React, { useState } from "react";

function ToyForm({ handleFormSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    console.log(formData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newToy => {
      handleFormSubmit(newToy);
      setFormData({
        name: "",
        image: "",
        likes: 0
      })
    })
    .catch(error => alert(error.message))
    .finally(console.log("New toy added."))
  };

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={(event) => handleSubmit(event)}>
        <h3>Create a toy!</h3>
        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={handleChange}
          value={formData.image}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
