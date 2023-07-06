// AdminAccessService.js
import axiosInstance from './axiosInstance';


export async function reservation(reservationData, token) {
  try {
    const response = await axiosInstance.post(`http://localhost:8080/lendmove/api/auth` + "/reservation/make", reservationData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error making reservation:', error);
    throw error;
  }
}

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

 

export async function findByUserActivReservation(available, token) {
  try {
    const response = await axiosInstance.get(
      "http://localhost:8080/lendmove/api/auth/reservation/user/available",
      {
        params: {
          available: available // Set the 'activ' query parameter value
        },
        headers: {
          Authorization: `Bearer ${token}` // Include the Authorization header with the token
        }
      }
    );

    return response.data.reservations; // Return the reservations data
  } catch (error) {
    console.error("Error fetching user reservations from  AdminAccessService:", error);
    throw error; // Rethrow the error to handle it in the component
  }
}


      

export async function deleteReservation(reservation, token) {
  try {
    const response = await axiosInstance.post('http://localhost:8080/lendmove/api/auth/reservation/delete', reservation, 
      reservation,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function findCarById(id, token) {
  try {
    const response = await axiosInstance.get(`http://localhost:8080/lendmove/api/auth/vehicule/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error finding car by ID:', error);
    throw error;
  }
}

      
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
      
      
    
      
      