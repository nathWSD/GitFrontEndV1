// AdminAccessService.js
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



/* -------------User and worker Manipulations--------------- */
export async function getAllUsers(page = 0, size = 20, sortBy = 'username', sortDir = 'asc', token) {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth`, {
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        sortDir: sortDir
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all records:', error);
    throw error;
  }
}

export async function updateRoleByUsername(username, roleRequest, token) {
  try {
    const response = await axiosInstance.post(`http://localhost:8080/lendmove/api/auth/update/${username}`, roleRequest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
}

  

export async function searchUserByUsername(username, token) {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth/search?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching user by username:', error);
    throw error;
  }
}


export async function deleteUser(id, token) {
  try {
    const response = await axiosInstance.delete(`http://localhost:8080/lendmove/api/auth/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function forgottenPassword(email, phonenumber, username, password) {
  try {
    const response = await axiosInstance.post(`http://localhost:8080/lendmove/api/auth/update/${email}${phonenumber}${username}${password}`, {
     
    });
    return response.data;
  } catch (error) {
    console.error('error reseting user data:', error);
    throw error;
  }
}
  
/* --------------------Reservation manipulation---------- */
export async function getAllReservations(page = 0, size = 20, sortBy = 'id', sortDir = 'asc', token) {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth/reservation/all?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all records:', error);
    throw error;
  }
}

 
export async function findByUserReservation(activ, token) {
  try {
    const response = await axiosInstance.get(
      "http://localhost:8080/lendmove/api/auth/reservation/user",
      {
        params: {
          activ: activ 
        },
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    throw error;
  }
}


export async function reservation(reservationData, token) {
  try {
    const response = await axiosInstance.post(`http://localhost:8080/lendmove/api/auth` + "/reservation/make", reservationData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error('Reservation not possible, car is reserved', { autoClose: 3000 });
    } else {
      console.error('Error making reservation:', error);
      toast.error('An error occurred during the reservation process', { autoClose: 3000 });
    }
    throw error;
  }
}

export async function workerMakesReservation(reservationData, token) {
  try {
    const response = await axiosInstance.post(`http://localhost:8080/lendmove/api/auth` + "/reservation/workerMakeReservation", reservationData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error('Reservation not possible, car is reserved', { autoClose: 3000 });
    } else {
      console.error('Error making reservation:', error);
      toast.error('An error occurred during the reservation process', { autoClose: 3000 });
    }
    throw error;
  }
}
      /*--------- reservation id and car id---- */
      export async function deleteReservation(id, carId, token) {
        try {
          const response = await axiosInstance.delete('http://localhost:8080/lendmove/api/auth/reservation/delete', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            data: { id, carId }
          });
          return response.data;
        } catch (error) {
          console.error('Error deleting reservation:', error);
          throw error;
        }
      }
      




export async function getReservationById(id, token) {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth/reservation/user/one?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

      
/* ------------------------------Cars Interactions----------------------------- */

export const findCarById = async (carId, token) => {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth/vehicule/${carId}`, {      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from findCarById:", response.data); // Add this line

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
};


      
      export async function addVehicle(vehiculeRequest, token) {
        try {
          const response = await axiosInstance.post('http://localhost:8080/lendmove/api/auth/vehicule/addVehicule', vehiculeRequest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error adding vehicle:', error);
          throw error;
        }
      };
      
      /* ------------------------------Payment Options----------------------------- */

   
      export async function PayPalPayment(PaypalResquest, token) {
        try {
          const response = await axiosInstance.post('http://localhost:8080/lendmove/api/auth/reservation/paypalPayment', PaypalResquest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error paypal payment vehicle:', error);
          throw error;
        }
      };
      

      export async function BankPayment(BankResquest, token) {
        try {
          const response = await axiosInstance.post('http://localhost:8080/lendmove/api/auth/reservation/bankPayment', BankResquest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error bankpayment vehicle:', error);
          throw error;
        }
      };

      export async function CreditCardPayment(CreditCardResquest, token) {
        try {
          const response = await axiosInstance.post('http://localhost:8080/lendmove/api/auth/reservation/creditcard', CreditCardResquest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error creditcard vehicle:', error);
          throw error;
        }
      };
      
      