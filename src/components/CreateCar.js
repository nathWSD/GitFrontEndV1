import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { firstDropdownOptions , getDependentOptions } from './dropdownOptions';
import { addVehicle } from "../services/AdminAccessService";
import AuthService from '../services/auth.service';
import "./CreateCar.css";

const CreateCar = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    description: '',
    city: '',
    actualstation: '',
    avaliable: true
  });
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const currentUser = AuthService.getCurrentUser();

  const  handleSubmit = async(e) => {
    e.preventDefault();

    const newVehicle = {
        name: formData.name,
        image: formData.image,
        category: formData.category,
        description: formData.description,
        city: formData.city,
        actualStation: formData.actualstation,
        avaliable: true,
    };

    try {
        
          console.log("Vehicle data:", newVehicle); 
          await addVehicle(newVehicle, currentUser.token); 
        
      

    setMessage('Car created successfully!');
    setShowPopup(true);

    setTimeout(() => {
        setShowPopup(false);
        navigate('/BoardAdmin');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Error creating car. Please try again.');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    
    }
  };

  return (
    <div>
      <h2>Create Car</h2>
      <form       className="CreateCarForm"
       onSubmit={handleSubmit}>
    
        <div>
          <label htmlFor="name">Name:</label>
          <input      className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">category:</label>
          <input      className="form-control"
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="description">description:</label>
          <input      className="form-control"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image Link:</label>
          <input  className="form-control"
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <select      className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Select a City</option>
            {firstDropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="actualstation">Actual Station:</label>
          <select      className="form-control"
            id="actualstation"
            name="actualstation"
            value={formData.actualstation}
            onChange={handleChange}
          >
            <option value="">Select an Actual Station</option>
            {getDependentOptions(formData.city).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button className = "createCar"
         type="submit">Create car</button>
      </form>
      {message && <p>{message}</p>}
      {/* Popup message */}
      {showPopup && <div className="popup-message">{message}</div>}
    </div>
  );
};

export default CreateCar;
