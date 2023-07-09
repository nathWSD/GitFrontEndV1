import '../HomePage.css';
import React from "react";
import SearchBar from "./Searchbar";

const Home = () => {
  return (
    <div className="video-kard">
      <video className="background-video" autoPlay loop muted>
      <source src="/piontView.mp4" type="video/mp4" />
      </video>

      <div className="contenu">
        <h3>let us plan a your movement together...</h3>
      </div>
      <SearchBar/>
    </div>
  );
};

export default Home;