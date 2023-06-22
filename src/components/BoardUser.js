import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";



const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
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
        <strong>Tarif:</strong> {currentUser.Tarif}
      </p>
      <p>
        <strong>Status:</strong> {currentUser.status}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
         am a user
         Auto buchen und sehen, 
         reservieren mit Abluafzeit.
         start und end zeit der Buchung sehen

      </ul>
 
      <div>
      <Link style={{textDecoration:'none',
      color:'blue'}} to="/user-profile">change personal data</Link>
     </div>

    </div>
  );
        }

export default BoardUser;
