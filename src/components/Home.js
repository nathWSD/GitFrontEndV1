import '../HomePage.css';
import React from "react";
import SearchBar from "./Searchbar";
import VideoBack from "./VideoBack.mp4";


const Home = () => {
  return (
    <div className="video-kard">
      <video className="background-video" autoPlay loop muted>
      <source src={VideoBack} type="video/mp4" />
      </video>

      <div className="contenu">
        <h3>let us plan a your movement together...</h3>
      </div>
      <SearchBar/>
    </div>
  );
};

export default Home;