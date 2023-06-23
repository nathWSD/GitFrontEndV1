import React, { useState } from 'react';
import AuthService from "../services/auth.service";
import "./UserInfo.css";

const UserInfo = () => {
    const currentUser = AuthService.getCurrentUser();
  const [userData, setUserData] = useState(currentUser);

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleEdit = () => {
    setEditing(true);
    setEditedData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editedData });
    setEditing(false);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="UserInfo">
      <div>
        <label className='UserInfo label'>First name: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="firstname"
            value={editedData.firstname || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.firstname}</span>
        )}
      </div>

      <div>
        <label className='UserInfo label'>Surname: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="surname"
            value={editedData.surname || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.surname}</span>
        )}
      </div>

      <div>
        <label className='UserInfo label'>User name: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="username"
            value={editedData.username || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.username}</span>
        )}
      </div>

      <div>
        <label className='UserInfo label'>Password: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="password"
            value={editedData.password || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.password}</span>
        )}
      </div>


     {/*  <div>
        <label>Repeat Password: </label>
        {editing ? (
          <input
            type="text"
            name="password"
            value={editedData.checkpassword || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.checkpassword}</span>
        )}
      </div> */}


            
      <div>
        <label className='UserInfo label'>City: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="city"
            value={editedData.city || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.city}</span>
        )}
      </div>

                  
      <div>
        <label className='UserInfo label'>Country: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="city"
            value={editedData.country || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.country}</span>
        )}
      </div>

      <div>
        <label className='UserInfo label'>street Name And Number </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="streetNameAndNumber"
            value={editedData.streetNameAndNumber || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.streetNameAndNumber}</span>
        )}
      </div>
      
      <div>
        <label className='UserInfo label'>postal Code: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="text"
            name="postalCode"
            value={editedData.postalCode || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.postalCode}</span>
        )}
      </div>

      <div>
        <label className='UserInfo label'>Email: </label>
        {editing ? (
          <input className= 'UserInfo input'
            type="email"
            name="email"
            value={editedData.email || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.email}</span>
        )}
      </div>

     {/*  <div>
        <label>Age: </label>
        {editing ? (
          <input
            type="number"
            name="age"
            value={editedData.age || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.age}</span>
        )}
      </div> */}

      {editing ? (
        <button  className='UserInfo button' onClick={handleSave}>Save</button>
      ) : (
        <button className='UserInfo button' onClick={handleEdit}>Edit</button>
      )}

    </div>
  );
};

export default UserInfo;
