import axios from "axios";

const API_URL = "http://localhost:3000";
export const getUsers = (phoneNumber, token) =>
  axios.get(`${API_URL}/user/getUser?phoneNumber=${phoneNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the authorization header
    },
  });

export const getAllUsers = (token) =>
  axios.get(`${API_URL}/user/getAllUsers`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvd2RhbUBnbWFpbC5jb20iLCJpYXQiOjE3MDU0MTU1MjZ9.zkCUe9qE-LPRpDbKUJ95U7XEqNi0jmh1KUx0Cqcl22g`, // Adding the authorization header
    },
  });
// console.log(JSON.stringify(getUsers));
export const createUser = async (dataParams, token) => {
  console.log("dasdasd", JSON.stringify(dataParams));

  let data = JSON.stringify({
    username: dataParams.username,
    email: dataParams.email,
    phoneNumber: dataParams.phoneNumber,
    newPassword: dataParams.newPassword,
    reEnterPassword: dataParams.reEnterPassword,
  });

  let config = {
    method: "POST",
    // maxBodyLength: Infinity,
    url: "http://localhost:3000/user/signUp",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvd2RhbUBnbWFpbC5jb20iLCJpYXQiOjE3MDU0MTU1MjZ9.zkCUe9qE-LPRpDbKUJ95U7XEqNi0jmh1KUx0Cqcl22g`,
    },
    data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("aisudbasd", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export const updateUser = async (data) => {
  // const userId = data.username + data.userId;
  console.log("aisudbasd", data);
  axios.put(`${API_URL}/user/updateUser`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvd2RhbUBnbWFpbC5jb20iLCJpYXQiOjE3MDU0MTU1MjZ9.zkCUe9qE-LPRpDbKUJ95U7XEqNi0jmh1KUx0Cqcl22g`,
    },
  });
};
export const deleteUser = (phoneNumber, token) =>
  axios.delete(`${API_URL}/user/deleteUser?phoneNumber=${phoneNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the authorization header
    },
  });
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
