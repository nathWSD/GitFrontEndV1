import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { firstDropdownOptions, getDependentOptions } from "./dropdownOptions";
import React, { useEffect, useState } from "react";
import cardsData from "./cardsData"; // Path to the file where cardsData is defined
import {
  deleteReservation,
  getAllReservations,
  searchUserByUsername,
  getAllUsers,
  updateRoleByUsername,
  findCarById,
  getReservationById,
} from "../services/AdminAccessService";
import "./BoardModerator.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tabledesign.css"

const BoardModerator = () => {
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
  const [showTable, setShowTable] = useState(false); // State variable to track table visibility

  const [reservationDeleteId, setReservationDeleteId] = useState("");
  const [carIdToDelete, setcarIdToDelete] = useState("");
  const [isTableVisible, setTableVisible] = useState(false);
  const [isUserTable, setIsUserTable] = useState(false);

  const handleSearchCars = async () => {
    try {
      if(searchId){
      const token = currentUser.token;
      const response = await findCarById(searchId, token);
      const result = response;
  
      if (result && result.found) {
        setSearchResult(result);
      } else {
        toast.error("Car not found with the given ID.");
        setSearchResult(null);
      }
    }
    else{
      toast.error("car Id not valid");
    }
    } catch (error) {
      console.error("Error searching cars:", error);
      toast.error("Error searching cars: An unexpected error occurred.");
      setSearchResult(null);
    }
  };

  const handleFirstDropdownSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const options = getDependentOptions(selectedValue);
    setDependentOptions(options);
    setDependentOption(""); 
  };

  const handleSearchUser = async () => {
    try {
      const token = currentUser.token;
      const userData = await searchUserByUsername(username, token);
      setUserDetails(userData);
      setIsUserTable(true);
    } catch (error) {
      toast.error("invalid user ");
    }
  };

  const fetchAllUsers = async () => {
    console.log(currentUser);

    const token = currentUser.token;
    try {
      if (showTable) {
        setShowTable(false);
        setUsers([]);
      } else {
        const response = await getAllUsers(0, 20, "username", "asc", token);
        const usersArray = response.users; // Access the users array
        setUsers(usersArray);
        setShowTable(true);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };


  const fetchAllReservations = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const token = currentUser.token; // Get the token from storage

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

      // If reservation data is already shown, hide it
      if (showReservationDataByID) {
        setShowReservationDataByID(false);
        setReservationData(null); // Reset reservation data
      } else {
        const data = await getReservationById(Number(reservationId), token);

        if (data && data.reservation) {
          // Reservation data found
          toast.success("Reservation found");
          setReservationData(data.reservation);
          console.log("This is reservation by id", data.reservation);
          setShowReservationDataByID(true);
        } else {
          toast.error("Reservation not found");
          // Reservation data not found or null
          setReservationData(null); // Reset reservation data
          setShowReservationDataByID(false);
        }
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
      setReservationData(null); // Reset reservation data if an error occurs
      setShowReservationDataByID(false);
    }
  };

  const handleDeleteReservation = async () => {
    const token = currentUser.token;
    console.log("delete token", token);
    try {
      const response = await deleteReservation(reservationDeleteId,carIdToDelete);
      console.log("Reservation deleted successfully:", response);
      toast("Reservation deleted successfully.", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast("Error deleting reservation.", { autoClose: 2000 });
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




      <div>
          <p>
            <strong> User Domain </strong>
          </p>

          <div>
            <button className="showReservationData"
            onClick={fetchAllUsers}>Fetch All Users</button>

            <div>
              <table className = "UserTable">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
        <div >
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/register"
          >
            create a new User
          </Link>
        </div>
        </div>






      <div >
        <div>
          <strong>Reservation Administration</strong>
        </div>

        <div>
          <input
            type="number"
            min="1"
            className ="input"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder="Enter Reservation ID"
          />
          <button className="showReservationData"
            onClick={handleFindReservation}
            disabled={!reservationId} // Disable button when reservationId is empty
          >
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
                <img className="ImgAllReservation"
                src={reservationData.image} alt="Car Image" />
              )}

              <ToastContainer />
              {/* Add more reservation data properties here */}
            </div>
          )}

          <button className ="showReservationData"
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
                    <img className ="ImgAllReservation"
                    src={reservation.image} alt="Car Image" />
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
           <div>
          <input
            type="number"
            min="1"
            className ="input"
            placeholder="reservation Id for deleting"
            value={reservationDeleteId}
            onChange={(e) => setReservationDeleteId(e.target.value)}
          />
          <input
            type="number"
            min="1"
            className ="input"
            placeholder="Car Id for deleting"
            value={carIdToDelete}
            onChange={(e) => setcarIdToDelete(e.target.value)}
          />

          <button className = "DeleteReservation"
           onClick={handleDeleteReservation} 
           disabled={!reservationDeleteId || !carIdToDelete}
          >Delete Reservation</button>
        </div>

          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/Fahrzeuge"
          >
            make User reservation 
          </Link>

        </div>

        <div >
          <p>
            <strong> Car Domain</strong>
          </p>
        </div>
       

        <div className="row">
          <input
            type="number"
            min="1"
            className ="input"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter card ID"
          />

          <button className="showReservationData"
          onClick={handleSearchCars}>
            {searchResult ? "Hide Result" : "Search"}
          </button>
          {searchResult && (
            <div>
              <h3>Search Result</h3>
              <p>Name: {searchResult.vehicule.name}</p>
              <img className="ImgAllReservation"
                src={searchResult.vehicule.image}
                alt={searchResult.vehicule.name}
              />
              <p>Category: {searchResult.vehicule.category}</p>
              <p>Description: {searchResult.vehicule.description}</p>
              <p>City: {searchResult.vehicule.city}</p>
              <p>Actual Station: {searchResult.vehicule.actualStation}</p>
            </div>
          )}
        </div>

      

      </div>
    </div>
  );
};

export default BoardModerator;
