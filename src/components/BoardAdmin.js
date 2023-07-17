import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import cardsData from "./cardsData"; 
import {
  addVehicle,
  getAllReservations,
  searchUserByUsername,
  getAllUsers,
  updateRoleByUsername,
  findCarById,
  getReservationById,
  deleteReservation,
} from "../services/AdminAccessService";
import "./BoardAdmin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tabledesign.css";
import { Toast } from "bootstrap";

const BoardAdmin = () => {
   const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});
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
  const [showTable, setShowTable] = useState(false); // State variable to track table visibility
  const [reservationDeleteId, setReservationDeleteId] = useState("");
  const [carIdToDelete, setcarIdToDelete] = useState("");
  const [isTableVisible, setTableVisible] = useState(false);
  const [isUserTable, setIsUserTable] = useState(false);

  const handleSearchCars = async () => {
    try {
      const token = currentUser.token; 
      if (searchId){
      const result = await findCarById(searchId, token);
      setTableVisible(true); 
      setSearchResult(result);
    }else{
      toast.error("car Id must be given");
    }
    } catch (error) {
      setError("Id does not corespond to any car");
      console.error("Error searching cars:", error);
    }
  };

 

  const handleSearchUser = async () => {
    try {
      const token = currentUser.token;
      const userData = await searchUserByUsername(username, token);
   
      setUserDetails(userData);
      setIsUserTable(true);
    } catch (error) {
      toast.error("invalid user ");
      console.error("Error searching user:", error);
    
    }
  };

  const fetchAllUsers = async () => {
    const token = currentUser.token;
    try {
      if (showTable) {
        setShowTable(false);
        setUsers([]);
      } else {
                const response = await getAllUsers(0, 20, "username", "asc", token);
        const usersArray = response.users;  setUsers(usersArray);
        setShowTable(true);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
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
        role: ["worker"],  };

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
      setIsLoading(true); 
      const token = currentUser.token; 
      const response = await getAllReservations(0, 20, "id", "asc", token);

      setfindReservations(response.reservations); 
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

  const handleFindReservation = async () => {
    try {
      const token = currentUser.token;

     
      if (showReservationDataByID) {
        setShowReservationDataByID(false);
        setReservationData(null); 
      } else {
        const data = await getReservationById(Number(reservationId), token);

        if (data && data.reservation) {
       
          toast.success("Reservation found");
          setReservationData(data.reservation);
          console.log("This is reservation by id", data.reservation);
          setShowReservationDataByID(true);
        } else {
          toast.error("Reservation not found");
          setReservationData(null); 
          setShowReservationDataByID(false);
        }
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
      setReservationData(null); 
      setShowReservationDataByID(false);
    }
  };

  const handleDeleteReservation = async () => {
    const token = currentUser.token;
    console.log("delete token", token);
    try {
      const response = await deleteReservation(
        reservationDeleteId,
        carIdToDelete
      );
      console.log("Reservation deleted successfully:", response);
      toast("Reservation deleted successfully.", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast("Reservation to delete not found.", { autoClose: 2000 });
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
          className="profilbild"
          src="https://previews.123rf.com/images/sarahdesign/sarahdesign1504/sarahdesign150403820/38808571-my-account-icon.jpg"
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
          <strong>Firstname:</strong> {currentUser.firstname}
        </p>
        <p>
          <strong>Surname:</strong> {currentUser.surname}
        </p>

        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>

        <div>
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/user-info"
          >
            change personal data
          </Link>
        </div>
      </div>

      <div>
        <div>
          <p>
            <strong> User Administration </strong>
          </p>

          <div>
            <button className = "FetchAllUsers"
             onClick={fetchAllUsers}>Fetch All Users</button>

            <div>
              <table className="UserTable">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>firstname</th>
                    <th>Surname</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Street Name and Number</th>
                    <th>roles</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.firstname}</td>
                      <td>{user.surname}</td>
                      <td>{user.country}</td>
                      <td>{user.city}</td>
                      <td>{user.streetNameAndNumber}</td>
                      <td>
                        {user.roles.map((role) => (
                          <span key={role.id}>{role.name}</span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <Link
              style={{ textDecoration: "none", color: "blue" }}
              to="/register"
            >
              create a new User
            </Link>
          </div>
        </div>

        <div className="row">
          <div>
            <input
              type="text"
              value={username}
              className="input"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <button className = "SearchUserButton"
            onClick={handleSearchUser}>Search</button>

            {isUserTable && userDetails && (
              <div className="table-container">
                <table className="UserTable">
                  <tbody>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                    </tr>
                    <tr>
                      <td>id</td>
                      <td>{userDetails.User.id}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{userDetails.User.username}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{userDetails.User.email}</td>
                    </tr>
                    <tr>
                      <td>Firstname</td>
                      <td>{userDetails.User.firstname}</td>
                    </tr>
                    <tr>
                      <td>Surname</td>
                      <td>{userDetails.User.surname}</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>{userDetails.User.country}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>{userDetails.User.city}</td>
                    </tr>
                    <tr>
                      <td>Street Name and Number</td>
                      <td>{userDetails.User.streetNameAndNumber}</td>
                    </tr>
                    <tr>
                      <td>Tarif</td>
                      <td>{userDetails.User.tarif}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="column-fullwidth">
        <div>
          <strong>Reservation Administration</strong>
        </div>

        <div>
          <input
            type="number"
            min="1"
            className="input"
            placeholder="reservation Id for deleting"
            value={reservationDeleteId}
            onChange={(e) => setReservationDeleteId(e.target.value)}
          />
          <input
            type="number"
            min="1"
            className ="inputCarId"
            placeholder="Car Id for deleting"
            value={carIdToDelete}
            onChange={(e) => setcarIdToDelete(e.target.value)}
          />
          <button className="DeleteReservation"
            onClick={handleDeleteReservation}
            disabled={!reservationDeleteId || !carIdToDelete}
          >
            Delete Reservation
          </button>
        </div>

        <div>
          <input
            type="number"
            min="1"
            className = "input"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder="Enter Reservation ID"
          />
          <button className = "showReservationData"
            onClick={handleFindReservation}
            disabled={!reservationId}   >
            {showReservationDataByID
              ? "Hide Reservation Data"
              : "Show Reservation Data"}
          </button>
          {showReservationDataByID && reservationData && (
            <div>
              <h2>Reservation Data:</h2>
              <p>Reservation ID: {reservationData.id}</p>
              <p>
                Reservation start Date: {reservationData.reservationDateStart}
              </p>
              <p>Reservation end Date: {reservationData.reservationDateEnd}</p>
              <p>
                Reservation Time start: {reservationData.reservationTimeStart}
              </p>
              <p>Reservation Time End: {reservationData.reservationTimeEnd}</p>
              {reservationData.image && (
                <img
                  className="ImgOneReservation"
                  src={reservationData.image}
                  alt="Car Image"
                />
              )}

              <ToastContainer />
                </div>
          )}

          <button className = "showAllReservations"
          onClick={handleToggleReservations}>
            {showReservations
              ? "Hide all Reservations"
              : "Show all Reservations"}
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
                  <li key={reservation.id}>
                    <img
                      className="ImgAllReservation"
                      src={reservation.image}
                      alt="Car Image"
                    />
                    <p>Username: {reservation.username}</p>
                    <p>reservation Id: {reservation.id}</p>
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
                  </li>
                ))}
              </ul>
            ))}
        </div>

        <div className="row">
          <p>
            <strong> Car Administration </strong>
          </p>
        </div>

        <div>
          <input
            type="number"
            min="1"
            className = "input"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter card ID"
          />
          <button className = "searchCar"
          onClick={handleSearchCars}>Search</button>

          {searchResult && searchResult.vehicule ? (
            <div>
              <h3>Search Result</h3>
              <p>Name: {searchResult.vehicule.name}</p>
              <img
                className="CarSearching"
                src={searchResult.vehicule.image}
                alt={searchResult.vehicule.name}
              />
              <p>Category: {searchResult.vehicule.category}</p>
              <p>Description: {searchResult.vehicule.description}</p>
              <p>City: {searchResult.vehicule.city}</p>
              <p>Actual Station: {searchResult.vehicule.actualStation}</p>
            </div>
          ) : (
            <div>
              {searchResult ? (
                <p>No search results found.</p>
              ) : (
                <p>Perform a search to see the results.</p>
              )}
            </div>
          )}
        </div>

        <div className="row">
          <button className="addAllVehicules"
          onClick={addAllVehiclesToDatabase}>Add All Vehicles</button>
         
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
          <input
            type="text"
            className="UserRole"
            placeholder="Enter username to be updated"
            value={usernameRoleChange}
            onChange={(e) => setusernameRoleChange(e.target.value)}
          />
          <button className="addAllVehicules"
          onClick={handleUpdateRole} disabled={!usernameRoleChange}>
            Search and Update user Role
          </button>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
