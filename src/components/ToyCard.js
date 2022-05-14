import React from "react";

function ToyCard({ toy, onLikesClick, onDonateClick}) {
  const handleLikeClick = (toyId) => {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: toy.likes + 1})
      })
      .then(response => response.json())
      .then(onLikesClick)
      .catch(error => alert(error.message))
    }

  const handleDonateClick = (toyId) => {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => onDonateClick(toy))
    .catch(error => alert(error.message))
    .finally(console.log("Thank you for donating a toy."))
  }

  return (
    <div key={toy.id} className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => handleLikeClick(toy.id)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDonateClick(toy.id)}>Donate to GoodWill</button>
    </div>
    );
  }

export default ToyCard;
