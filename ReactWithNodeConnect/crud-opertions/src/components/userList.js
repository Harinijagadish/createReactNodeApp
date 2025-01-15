import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "./services/api";
import { getUserToken } from "./utils/getUserToken";
import "./styles/userList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // To store error messages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (
          response.data &&
          response.data.users &&
          response.data.users.length > 0
        ) {
          setUsers(response.data.users);
        } else {
          setErrorMessage("No users found");
        }
      } catch (error) {
        setErrorMessage("Error fetching users");
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (phoneNumber) => {
    try {
      const { token } = await getUserToken(phoneNumber);
      await deleteUser(phoneNumber, token);
      setUsers(users.filter((user) => user.phoneNumber !== phoneNumber));
    } catch (error) {
      alert("Error deleting user");
    }
  };

  return (
    <div className="container">
      <div className="user-list-card">
        <h2>User List</h2>
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <div>
                  <strong>{user.username}</strong> ({user.email})
                </div>
                <button onClick={() => handleDelete(user.phoneNumber)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
