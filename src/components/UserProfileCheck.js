import React from 'react';
import { Navigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import AuthService from "../services/auth.service";

const UserProfileCheck = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    // Redirect the user to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <UserInfo currentUser={currentUser} />
    </div>
  );
};

export default UserProfileCheck;
