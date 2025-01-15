import axios from "axios";

// Define the function to get user token
export const getUserToken = async (phoneNumber) => {
  try {
    const config = {
      method: "GET",
      url: `http://localhost:3000/user/getUserToken?phoneNumber=${phoneNumber}`,
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data)); // Log the response data
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error(error); // Log any errors that occur
    throw error; // Rethrow the error if necessary
  }
};

// Export the function so it can be used in other modules
// module.exports = { getUserToken };
