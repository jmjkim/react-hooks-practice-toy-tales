import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikesClick, onDonateClick }) {  
  return toys.map(toy => {
    return (
      <div key={toy.id} id="toy-collection">
        <ToyCard toy={toy} onLikesClick={onLikesClick} onDonateClick={onDonateClick}/>
      </div>
    );
  })
}

export default ToyContainer;
