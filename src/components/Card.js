import React from 'react';
import { useNavigate  } from 'react-router-dom';
/* import {withRouter} from 'react-router';
 */

const Card = ({ title, image, description, linkUrl}) => {
  const navigate  = useNavigate();

  const handleClick = () => {
    navigate.push(linkUrl);
  };

  return (
    <a className="card" onClick={handleClick}>
      <img className="card-image" src={image} alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </a>
  );
};

export default Card;