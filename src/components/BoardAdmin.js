import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { firstDropdownOptions, getDependentOptions } from "./dropdownOptions";
import React, { useEffect, useState } from "react";
import cardsData from "./cardsData"; // Path to the file where cardsData is defined
import {
  addVehicle,
  getAllReservations,
  searchUserByUsername,
  getAllUsers,
  updateRoleByUsername,
  findCarById,
  getReservationById,
} from "../services/AdminAccessService";
import "./BoardAdmin.css";

const BoardAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [dependentOption, setDependentOption] = useState("");
  const [dependentOptions, setDependentOptions] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [usernameRoleChange, setusernameRoleChange] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

  const [showReservations, setShowReservations] = useState(false);
  const [findreservations, setfindReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reservationId, setReservationId] = useState("");
  const [reservationData, setReservationData] = useState(null);
  const [showReservationDataByID, setShowReservationDataByID] = useState(false);

  const handleSearchCars = async () => {
    try {
      const token = currentUser.token; // Get the token from localStorage or another source

      // Call the findCarById function to fetch the car by ID
      const result = await findCarById(searchId, token);

      // Process the result here
      setSearchResult(result);
    } catch (error) {
      // Handle error
      console.error("Error searching cars:", error);
    }
  };

  const handleFirstDropdownSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const options = getDependentOptions(selectedValue);
    setDependentOptions(options);
    setDependentOption(""); // Reset the selected value of the dependent dropdown
  };

  const handleSearchUser = async () => {
    try {
      const token = currentUser.token;
      const userData = await searchUserByUsername(username, token);
      // Handle the retrieved user data
      console.log(userData);
    } catch (error) {
      console.error("Error searching user:", error);
      // Handle the error
    }
  };

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

  const handleDeleteReservation = async (reservationId) => {
    // Make an API call to delete the reservation
    try {
      await fetch(`/api/reservations/${reservationId}`, {
        method: "DELETE",
      });
      // Remove the deleted reservation from the state
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const addAllVehiclesToDatabase = async () => {
    try {
      console.log(currentUser.token);
      for (const vehicle of cardsData) {
        console.log("Vehicle data:", vehicle); // Log the vehicle data
        await addVehicle(vehicle, currentUser.token); // Pass the token as the second argument
      }
      console.log("All vehicles added to the database successfully!");
    } catch (error) {
      console.error("Error adding vehicles:", error);
      throw error;
    }
  };

  const handleUpdateRole = async () => {
    const token = currentUser.token;
    try {
      const roleRequest = {
        role: ["worker"], // Replace 'worker' with the desired role(s)
      };

      const updateResponse = await updateRoleByUsername(
        usernameRoleChange,
        roleRequest,
        token
      );

      if (updateResponse) {
        setMessage(`User ${usernameRoleChange} has been updated successfully.`);
      } else {
        setMessage(
          `User ${usernameRoleChange} is not present in the database.`
        );
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setMessage("An error occurred while updating the role.");
    }
  };

  const fetchAllReservations = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const token = currentUser.token; // Get the token from storage

      // Call the API to fetch all reservations
      const response = await getAllReservations(0, 20, "id", "asc", token);

      setfindReservations(response.reservations); // Update reservations state with fetched data
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setIsLoading(false); // Set loading state to false
      setError(error); // Set error state
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


  const handleFindReservation = async () => {
    try {
      const token = currentUser.token;
      const data = await getReservationById(Number(reservationId), token);
      setReservationData(data);
      setShowReservationDataByID(true);
    } catch (error) {
      console.error("Error fetching reservation:", error);
      setReservationData(null); // Reset reservation data if an error occurs
      setShowReservationDataByID(false);

    }
  };
  
  return (
    <div className="board-admin">
      <div className="column column-left">
        <h2>{currentUser.username} Profile</h2>
        <header>
          <h3>
            <strong>personal data</strong>
          </h3>
        </header>
        <img
          class="profilbild"
          src="https://previews.123rf.com/images/sarahdesign/sarahdesign1504/sarahdesign150403820/38808571-my-account-icon.jpg"
          width="300"
          height="300"
        ></img>
        <p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>

          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Firstname:</strong> {currentUser.firstname}
          </p>
          <p>
            <strong>Surname:</strong> {currentUser.surname}
          </p>

          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </p>

        <div>
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/user-info"
          >
            change personal data
          </Link>
        </div>
      </div>

      <div className="column column-right">
        <div className="row">
          <p>
            <strong> Car Administration </strong>
          </p>
        </div>
        <div className="row">
          <div>
            <select value={selectedOption} onChange={handleFirstDropdownSelect}>
              <option value="">Select a City</option>
              {firstDropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedOption && (
              <select
                value={dependentOption}
                onChange={(e) => setDependentOption(e.target.value)}
              >
                <option value="">Select a location</option>
                {dependentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="row">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter card ID"
          />
          <button onClick={handleSearchCars}>Search</button>

          {searchResult && (
            <div className="row row-result">
              <h3>Search Result</h3>
              <p>Name: {searchResult.name}</p>
              <img src={searchResult.image} alt={searchResult.name} />
              <p>Category: {searchResult.category}</p>
              <p>Description: {searchResult.description}</p>
              <p>city: {searchResult.city}</p>
              <p>actualstation: {searchResult.actualStation}</p>
            </div>
          )}
        </div>

        <div className="row">
          <button onClick={addAllVehiclesToDatabase}>Add All Vehicles</button>
          Row 4 - Item 1
        </div>
        <div className="row">
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/createCar"
          >
            create a new Car
          </Link>
        </div>

        <div className="row">
          <p>
            <strong> User Administration </strong>
          </p>
        </div>

        <div className="row">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <button onClick={handleSearchUser}>Search</button>

            {userDetails && (
              <div>
                <h3>User Details</h3>
                <p>Username: {userDetails.username}</p>
                <p>Email: {userDetails.email}</p>
                <p>surname: {userDetails.surname}</p>
                <p>city: {userDetails.city}</p>
                <p>street Name and Number: {userDetails.streetNameAndNumber}</p>
              </div>
            )}

            {reservations.length > 0 && (
              <div>
                <h3>Reservations</h3>
                {reservations.map((reservation) => (
                  <div key={reservation.id}>
                    <p>Reservation ID: {reservation.id}</p>
                    <p>Date: {reservation.date}</p>
                    <p>Time: {reservation.time}</p>
                    <button
                      onClick={() => handleDeleteReservation(reservation.id)}
                    >
                      Delete Reservation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <button onClick={fetchAllUsers}>Fetch All Users</button>

          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="row">
          <input
            type="text"
            value={usernameRoleChange}
            onChange={(e) => setusernameRoleChange(e.target.value)}
          />
          <button onClick={handleUpdateRole}>
            Search and Update user Role
          </button>
          <div>{message}</div>
        </div>
        <div className="row">
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/register"
          >
            create a new User
          </Link>
        </div>

        <div>
        <input
  type="number"
  value={reservationId}
  onChange={(e) => setReservationId(e.target.value)}
  placeholder="Enter Reservation ID"
/>
<button
  onClick={() => {
    setReservationData(null);
    setShowReservationDataByID(false);
  }}
>
  Clear Reservation Data
</button>
      </div>

<div>
{showReservationDataByID ? (
  <div>
    <h2>Reservation Data:</h2>
    <p>Reservation ID: {reservationData?.reservationId}</p>
    <p>Reservation Date: {reservationData?.reservationDate}</p>
    {/* Add more reservation data properties here */}
  </div>
) : (
  <p>No Reservation Data</p>
)}

</div>

      </div>

      <div class="row row-result">
        <button onClick={handleToggleReservations}>
          {showReservations ? "Hide Reservations" : "Show Reservations"}
        </button>
        {showReservations &&
          (isLoading ? (
            <p>Loading reservations...</p>
          ) : error ? (
            <p>Error fetching reservations: {error.message}</p>
          ) : findreservations.length === 0 ? (
            <p>No reservations available.</p>
          ) : (
            <ul>
              {findreservations.map((reservation) => (
                <div key={reservation.id}>
                  <p>Username: {reservation.username}</p>
                  <img src={reservation.image} alt="Car Image" />
                  <p>Start Date: {reservation.reservationDateStart}</p>
                  <p>Start Hour: {reservation.reservationTimeStart}</p>
                  <p>End Date: {reservation.reservationDateEnd}</p>
                  <p>End Hour: {reservation.reservationTimeEnd}</p>
                  <p>Car ID: {reservation.carId}</p>
                  <p>
                    price: {reservation.price}
                    {"\u20AC"}
                  </p>
                  <p>Station: {reservation.stationStart}</p>
                </div>
              ))}
            </ul>
          ))}
      </div>

    </div>
  );
};

export default BoardAdmin;
