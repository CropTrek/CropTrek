import React, { useState } from "react";
import { useRouter } from "next/router";


const Rating = ({ value, onClick }) => {
  const stars = Array(5).fill(0).map((_, i) => i + 1);

  return (
    <div className="rating">
      {stars.map((star) => (
        <i
          key={star}
          className={
            value >= star
              ? "fas fa-star"
              : value >= star - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
          onClick={() => onClick(star)}
        ></i>
      ))}
    </div>
  );
};

const MyComponent = () => {
  const [rating, setRating] = useState(0);


  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div>
      <Rating value={rating} onClick={handleRatingClick} />
      <p>Selected rating: {rating}</p>
    </div>
  );
};

export default MyComponent;
