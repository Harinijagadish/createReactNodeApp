// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateUser from "./components/createUser";
// import UserList from "./components/userList";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={UserList} /> */}
        <Route exact path="/" component={CreateUser} />
      </Switch>
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch data from the backend
//     axios
//       .get("http://localhost:3000/user/getUser?phoneNumber=7845272776", {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvd2RhbUBnbWFpbC5jb20iLCJpYXQiOjE3MzY5MTI5Njh9.sxIia3DnNPnwy86nsW_wykuR84sBKYLPxQGgrLcySSc`, // Adding the authorization header
//         },
//       })
//       .then((response) => {
//         setMessage(response.data.message);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>React and Node.js Connection</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;
