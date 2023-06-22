import React, { useState } from 'react';

const UserInfo = ({ currentUser }) => {
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
    <div>
      <div>
        <label>Name: </label>
        {editing ? (
          <input
            type="text"
            name="name"
            value={editedData.name || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={editedData.email || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{userData.email}</span>
        )}
      </div>
      <div>
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
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default UserInfo;
