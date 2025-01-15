import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../components/services/api";
import { getUserToken } from "./utils/getUserToken";
import "./styles/createUser.css"; // Make sure to import the CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formMode, setFormMode] = useState("create"); // Modes: 'create' or 'edit'
  const [currentUser, setCurrentUser] = useState({
    username: "diesh",
    email: "dinesh@gmail.com",
    phoneNumber: "sdasd",
    newPassword: "asdasd",
    reEnterPassword: "asdasd",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (
          response?.data &&
          response?.data?.users &&
          response?.data?.users?.length > 0
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formMode === "create") {
        console.log("Creating user:", currentUser);
        await createUser(currentUser, "qw");
      } else if (formMode === "edit") {
        console.log("Editing user:", currentUser);
        await updateUser(currentUser);
        setUsers(
          users.map((user) =>
            user._id === currentUser._id ? currentUser : user
          )
        );
      }
      // Fetch the updated user list to display the latest users
      // const updatedUsers = await getAllUsersWithTimeout();
      // console.log("Updated users:", updatedUsers);
      // setUsers(updatedUsers.data.users);
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error?.response?.data?.error);
      setErrorMessage(error?.response?.data?.error);
    }
  };

  // // Function to fetch users with a timeout
  // const getAllUsersWithTimeout = () => {
  //   return new Promise((resolve, reject) => {
  //     const timeout = setTimeout(() => {
  //       reject(new Error("Request timed out"));
  //     }, 5000);

  //     getAllUsers()
  //       .then((users) => {
  //         console.log("User", users);
  //         clearTimeout(timeout); // Clear the timeout once the request succeeds
  //         resolve(users);
  //       })
  //       .catch((err) => {
  //         clearTimeout(timeout); // Clear timeout in case of error
  //         reject(err);
  //       });
  //   });
  // };

  const resetForm = () => {
    setCurrentUser({
      username: "",
      email: "",
      phoneNumber: "",
      newPassword: "",
      reEnterPassword: "",
    });
    setFormMode("create");
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormMode("edit");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{formMode === "create" ? "Create User" : "Edit User"}</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={currentUser.username}
            onChange={(e) => {
              const key = formMode === "create" ? "username" : "userId"; // Dynamically set the field key
              setCurrentUser({ ...currentUser, [key]: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={currentUser.phoneNumber}
            onChange={(e) => {
              const phone = e.target.value.replace(/\D/g, ""); // Remove non-digits
              setCurrentUser({ ...currentUser, phoneNumber: phone });
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={currentUser.newPassword}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, newPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={currentUser.reEnterPassword}
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                reEnterPassword: e.target.value,
              })
            }
            required
          />
          <button type="submit">
            {formMode === "create" ? "Create User" : "Save Changes"}
          </button>
          {formMode === "edit" && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="user-list-container">
        <h2>User List</h2>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.phoneNumber)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
