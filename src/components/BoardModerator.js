import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import {searchUserByUsername,getAllUsers, getAllReservations ,findCarById,} from "../services/AdminAccessService";
import React, { useEffect, useState } from "react";

const BoardModerator = () => {
  const currentUser = AuthService.getCurrentUser();
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReservations, setShowReservations] = useState(false);

  const fetchAllUsers = async () => {
    const token = currentUser.token;
    try {
      const response = await getAllUsers(0, 20, "username", "asc", token);
      const usersArray = response.users; // Access the users array
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const fetchAllReservations = async () => {
    try {
      setIsLoading(true);
      const token = currentUser.token;
      const response = await getAllReservations(0, 20, "id", "asc", token);
      setReservations(response.reservations);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleToggleReservations = () => {
    setShowReservations((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (showReservations) {
      fetchAllReservations();
    }
  }, [showReservations]);

  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <img
        class="profilbild"
        src="https://st2.depositphotos.com/1853861/7026/v/950/depositphotos_70267151-stock-illustration-my-account-icon.jpg"
        width="300"
        height="300"
      ></img>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

      <p>
        <strong>Status:</strong> {currentUser.status}
      </p>

      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <div>
        <Link style={{ textDecoration: "none", color: "blue" }} to="/user-info">
          change personal data
        </Link>
      </div>

      <button onClick={fetchAllUsers}>Fetch All Users</button>

      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>


      <button onClick={handleToggleReservations}>
        {showReservations ? "Hide Reservations" : "Show Reservations"}
      </button>
      {showReservations &&
        (isLoading ? (
          <p>Loading reservations...</p>
        ) : error ? (
          <p>Error fetching reservations: {error.message}</p>
        ) : reservations.length === 0 ? (
          <p>No reservations available.</p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <div key={reservation.id}>
              <p>Username: {reservation.username}</p>
              <img src={reservation.image} alt="Car Image" />
              <p>Start Date: {reservation.reservationDateStart}</p>
              <p>Start Hour: {reservation.reservationTimeStart}</p>
              <p>End Date: {reservation.reservationDateEnd}</p>
              <p>End Hour: {reservation.reservationTimeEnd}</p> 
              <p>Car ID: {reservation.carId}</p>
              <p>price: {reservation.price}{'\u20AC'}</p>
              <p>Station: {reservation.stationStart}</p>

              
            </div>)
            )}
          </ul>
        ))}


    </div>
  );
};
export default BoardModerator;
