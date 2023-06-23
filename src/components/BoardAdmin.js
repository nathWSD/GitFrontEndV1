import './BoardAdmin.css';
import AuthService from "../services/auth.service";
import {  Link } from "react-router-dom";


const BoardAdmin = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="page-container">
      <div className="column column-1">

    {/* Paragraph 1 */}

        <h2>Personal Data</h2>
        <p>
        <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}   
      </ul>

      <div>
      <Link style={{textDecoration:'none',
      color:'blue'}} to="/user-info">change personal data</Link>
     </div>
        </p>


      </div>
      <div className="column column-2">
        <h2>Column 2</h2>
        <p>Content for Column 2</p>
      </div>
      <div className="column column-3">
        <h2>Column 3</h2>
        <p>Content for Column 3</p>
      </div>
    </div>
  );
};
export default BoardAdmin;
