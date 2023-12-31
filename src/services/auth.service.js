import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/lendmove/api/auth/";


const register = ( 
  username,
  firstname,
  surname,
  email,
  password,
  city,
  postalCode,
  country,
  streetNameAndNumber,
  phonenumber,
  tarif,
  checkpassword,
  birthday, 
    ) => {
  console.log('Register Request:', {
    username,
    firstname,
    surname,
    email,
    password,
    city,
    postalCode,
    country,
    streetNameAndNumber,
    phonenumber,
    tarif,
    checkpassword,
    birthday, 
  }); // Log the request payload
  return axios.post(API_URL + "signup", {
    username,
    firstname,
    surname,
    email,
    password,
    city,
    postalCode,
    country,
    streetNameAndNumber,
    phonenumber,
    tarif,
    checkpassword,
    birthday, 
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        const token = response.data.accessToken; 
        console.log(response.data.accessToken)
        const user = response.data.user; 
        localStorage.setItem(user.roles + "-token", token); 
      }
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem('user');
  return axios.get('http://localhost:8080/lendmove/api/auth/logoutUser')
    .then(response => {
      console.log('Logout successful');
    })
    .catch(error => {
      // Handle error
      console.error('Error during logout:', error);
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const reservation = (
  reservationDateStart,
  reservationDateEnd,
  reservationTimeStart,
  reservationTimeEnd,
  carId,
  stationStart,
  stationEnd,
  tarif
) => {
  const token = localStorage.getItem("user").token;
  console.log(token)
  // Set the default Authorization header for all requests
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  const reservationData = {
    reservationDateStart,
    reservationDateEnd,
    reservationTimeStart,
    reservationTimeEnd,
    carId,
    stationStart,
    stationEnd,
    tarif 
  };

  return axiosInstance.post(API_URL + "reservation/make", reservationData)
    .then((response) => {
      // Handle the response if needed
    });
};


const changePersonalData = (
  id,
  username,
  firstname,
  surname,
  email,
  password,
  city,
  postalCode,
  country,
  streetNameAndNumber,
  phonenumber,
  tarif,
) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const userData = {
    id,
    username,
    firstname,
    surname,
    email,
    password,
    city,
    postalCode,
    country,
    streetNameAndNumber,
    phonenumber,
    tarif,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return fetch('http://localhost:8080/lendmove/api/auth/update', {
    method: 'POST',
    headers,
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to change personal data.');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error changing personal data:', error);
      throw error;
    });
};



const ResetPersonalData = ( 
  username,
  email,
  password,
  phonenumber,
  checkpassword,
    ) => {

  return axios.post(API_URL + "update", {
    username,
    email,
    password,
    phonenumber,  
    checkpassword,
    });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  reservation,
  changePersonalData,
  ResetPersonalData,
}

export default AuthService;
