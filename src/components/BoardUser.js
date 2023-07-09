import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import "./BoardUser.css";
import { useNavigate } from "react-router-dom";
import Fahrzeuge from "./Fahrzeuge";
import Buchung from "./Buchung";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  findByUserReservation,
  deleteReservation,
} from "../services/AdminAccessService";

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


// Function to handle payment and update the paid status
const handlePayment = (reservationId) => {
  const updatedReservations = reservations.map((reservation) => {
    if (reservation.id === reservationId) {
      return {
        ...reservation,
        paid: true, // Set the paid status to true
      };
    }
    return reservation;
  });
  setReservations(updatedReservations);
};

  const handleFetchReservations = async () => {
    try {
      const token = currentUser.token;
      console.log("my token ---", token);
      setIsLoading(true);
      setError(null); // Reset the error state before making the API call
  
      findByUserReservation("activ", token)
        .then((response) => {
          console.log("this is response", response);
          const receivedReservations = response.reservations || [];
          const reservationsWithPaidStatus = receivedReservations.map((reservation) => ({
            ...reservation,
            paid: false, // Set the initial paid status to false
          }));
          setReservations(reservationsWithPaidStatus);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  


  const handleDeleteReservation = async (reservationId, carId, token) => {
    try {
       // Find the reservation with the specified reservationId and carId
      const reservationToDelete = reservations.find(
        (reservation) => reservation.id === reservationId && reservation.carId === carId
      );
  
      if (reservationToDelete) {
        console.log("reservationToDelete id", reservationToDelete.id)
      console.log("reservationToDelete carID" , reservationToDelete.carId)
     
        await deleteReservation(reservationToDelete.id, reservationToDelete.carId, token);
        // Remove the deleted reservation from the state
        setReservations(
          reservations.filter(
            (reservation) =>
              reservation.id !== reservationId || reservation.carId !== carId
          )
        );
      } else {
        console.error("Reservation not found");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="BoardUser">
      <div className="rows">
        <h2>{currentUser.username} Profile</h2>
        <header>
          <h3>
            <strong>personal data</strong>
          </h3>
        </header>
        <img
          className="profilbild"
          src="https://previews.123rf.com/images/sarahdesign/sarahdesign1506/sarahdesign150605280/41564095-my-account-icon.jpg"
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
        <p>
          <strong>Tarif:</strong> {currentUser.tarif}
        </p>
        <p>
          <strong>Date of entry:</strong> {currentUser.createdAt}
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

      <div className="rows">
        <h2>booked Cars</h2>
    
          <p>Reservations:</p>
          <div>
            {/* Button to fetch reservations */}
            <button onClick={handleFetchReservations}>
              Fetch Reservations
            </button>

            {/* Display reservations */}
            {isLoading && <p>Loading reservations...</p>}
            {!isLoading && error && (
              <p>Error fetching reservations: {error.message}</p>
            )}
            {!isLoading && !error && (
              <div>
                <h2>Reservations:</h2>
                {isLoading && <p>Loading reservations...</p>}
                {error && <p>Error fetching reservations: {error}</p>}
                {!isLoading && !error && (
                  <div>
                    {reservations.length === 0 ? (
                      <p>No reservations have been made.</p>
                    ) : (
                      reservations.map((reservation) => (
                        <div key={reservation.id}>
                          <img src={reservation.image} alt="Car Image" />
                          <p>Car Id: {reservation.carId}</p>
                          <p>
                            Price: {reservation.price} {"\u20AC"}
                          </p>
                          <p>
                            Reservation Date start:{" "}
                            {reservation.reservationDateStart}
                          </p>
                          <p>
                            Reservation Date End:{" "}
                            {reservation.reservationDateEnd}
                          </p>
                          <p>
                            Reservation Time start:{" "}
                            {reservation.reservationTimeStart}
                          </p>
                          <p>
                            Reservation Time End:{" "}
                            {reservation.reservationTimeEnd}
                          </p>
                          <p>
                            Start and End Station: {reservation.stationStart}
                          </p>
                          <p style={{ color: reservation.paid ? "green" : "red" }}>
                          Payment Status: {reservation.paid ? "Paid" : "Not Paid"}
                           </p>
                          <button onClick={() => handleDeleteReservation(parseInt(reservation.id), parseInt(reservation.carId))}>
                              Delete
                            </button>
                          <Link
                            to={`/abrechnung?reservationId=${reservation.id}&carId=${reservation.carId}&price=${reservation.price}&image=${reservation.image}`}
                          >
 {!reservation.paid && (
              <button onClick={() => handlePayment(reservation.id)}>
                Make Payment
              </button>
            )}                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
      
      </div>
      <div className="rows">
        <h1>User Dashboard</h1>
        <p>
          <Link to="/fahrzeuge">
            <button>choose a car</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BoardUser;
