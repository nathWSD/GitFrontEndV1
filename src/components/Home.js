import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const backgroundImageUrl = 'https://cdn.wallpapersafari.com/93/9/kguQhG.jpg';
  return (

    <div className="container" 
    style={{
      backgroundImage:`url(${backgroundImageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      home about everythiing project school and info
    </div>
  );
};

export default Home;
