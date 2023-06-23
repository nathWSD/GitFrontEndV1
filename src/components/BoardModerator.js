import AuthService from "../services/auth.service";
import {  Link } from "react-router-dom";



const BoardModerator = () => {
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
        <strong>Status:</strong> {currentUser.status}
      </p>

      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          Am Worker
      </ul>

      <div>
      <Link style={{textDecoration:'none',
      color:'blue'}} to="/user-info">change personal data</Link>
     </div>
    </div>
  );
        }
export default BoardModerator;
