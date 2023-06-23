import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ name, image, category, description, linkUrl }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(linkUrl);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image-container">
        <img className="card-image" src={image} alt={name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{name}</h2>
        <h2 className="card-category">{category}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
