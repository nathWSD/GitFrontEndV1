import React from "react";
import AuthService from "../services/auth.service";
import BoardAdmin from "./BoardAdmin";
import BoardModerator from "./BoardModerator";
import BoardUser from "./BoardUser";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  

// Find the user by username
const user =currentUser.username ;

// Check if the current user exists and has a username

  // Check the username and redirect to the corresponding page
  if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN')) {
    return (
      <BoardAdmin/>
    );
  } else if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_WORKER')) {
    return <BoardModerator />;
  } else if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER')) {
    return <BoardUser />;
  }

else{

  return (
    <div className="container">
    no ------------
  </div>
  );
 

  

;
}
}
export default Profile;
