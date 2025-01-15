const signUpModel = require("../Models/signupModel");
const jwtToken = require("../utils/generateAuthToken");
const { USER_MESSAGE } = require("../utils/constants");
const {
  USER_ALREADY_EXISTS,
  PASSWORD_MISMATCH,
  LOGIN_MSG,
  USER_CREATED,
  INTERNAL_SERVER_ERROR,
  INVALID_AUTHORIZATION,
  SIGN_UP_MSG,
  USER_NOT_FOUND_ERROR,
  MISSING_AUTHORIZATION,
  USER_DELETED,
  USER_LOGGED_IN,
  AUTHORIZATION,
} = USER_MESSAGE;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const signUpUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, newPassword, reEnterPassword } =
      req.body;

    // Check for missing keys
    const expectedKeys = {
      username,
      email,
      phoneNumber,
      newPassword,
      reEnterPassword,
    };
    console.log("expectedKeys", expectedKeys);
    const missingKeys = [];
    for (let param in expectedKeys) {
      if (!expectedKeys[param]) {
        missingKeys.push(param);
      }
    }
    if (missingKeys.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing required keys: ${missingKeys.join(", ")}` });
    }

    if (newPassword !== reEnterPassword) {
      return res.status(400).json({ error: PASSWORD_MISMATCH });
    }

    const query = { email, phoneNumber };
    const results = await signUpModel.find(query);

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: USER_ALREADY_EXISTS, message: LOGIN_MSG });
    }

    const usernameTimestamp = `${username}${Date.now()}`;
    const token = (await jwtToken.jwtToken(email)) || null;

    const reqBodyParams = {
      _id: Date.now(),
      username: usernameTimestamp,
      email,
      phoneNumber,
      newPassword,
      reEnterPassword,
      token,
    };
    console.log("reqBodyParams", reqBodyParams);

    const signUpDetails = await signUpModel.create(reqBodyParams);

    res.status(200).json({
      username: signUpDetails.username,
      message: USER_CREATED,
    });
  } catch (error) {
    if (error._message) {
      return res.status(400).json({
        message: `${error._message.replace(
          "Signup",
          "Phone number"
        )}: must be 10 characters`,
      });
    } else if (error.keyPattern) {
      return res.status(400).json({
        message: `${Object.keys(error.keyValue).join(", ")}: must be unique`,
      });
    } else {
      return res
        .status(error.code || 500)
        .json({ message: error.message || INTERNAL_SERVER_ERROR });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const token = req.headers[AUTHORIZATION]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: INVALID_AUTHORIZATION });
    }

    jwt.verify(token, jwtSecretKey);

    const { email, phoneNumber, password } = req.body;
    const query = { $or: [{ email }, { phoneNumber }] };
    const results = await signUpModel.find(query);

    if (results.length === 0) {
      return res
        .status(200)
        .json({ error: USER_NOT_FOUND_ERROR, message: SIGN_UP_MSG });
    }

    const user = results[0];

    // Use a secure method for password comparison (e.g., bcrypt)
    // For demonstration purposes, direct comparison is used here. Replace with a secure implementation.
    if (user.newPassword !== password) {
      return res.status(401).json({ error: PASSWORD_MISMATCH });
    }

    res.status(200).json({
      username: user.username,
      message: USER_LOGGED_IN,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getUserByEmailOrPhn = async (req, res, data) => {
  try {
    const { email, phoneNumber } = req.query;
    const token = req.headers[AUTHORIZATION]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: INVALID_AUTHORIZATION });
    }

    const verified = jwt.verify(token, jwtSecretKey);

    if (!verified) {
      return res.status(401).json({ message: INVALID_AUTHORIZATION });
    }

    const query = { $or: [{ email }, { phoneNumber }] };
    const results = await signUpModel.find(query);
    console.log(results[0]._id);
    if (results.length === 0) {
      return res
        .status(200)
        .json({ error: USER_NOT_FOUND_ERROR, message: SIGN_UP_MSG });
    }

    const {
      username,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      newPassword,
    } = results[0];
    const resParams = {
      username,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      password: newPassword,
      userId: results[0]._id,
    };

    res.status(200).json(resParams);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const token = req.headers[AUTHORIZATION]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: INVALID_AUTHORIZATION });
    }

    const verified = jwt.verify(token, jwtSecretKey);

    if (!verified) {
      return res.status(401).json({ message: INVALID_AUTHORIZATION });
    }

    // Fetch all users from the database
    const results = await signUpModel.find({});

    if (results.length === 0) {
      return res
        .status(200)
        .json({ error: USER_NOT_FOUND_ERROR, message: "No users found" });
    }

    // Map through all users and structure the response
    const users = results.map((user) => ({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userId: user._id,
    }));

    res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || INTERNAL_SERVER_ERROR });
  }
};

const getToken = async (req, res) => {
  try {
    let { email, phoneNumber } = req?.query;
    const query = { $or: [{ email }, { phoneNumber }] };
    const results = await signUpModel.find(query);
    if (results.length === 0) {
      return res
        .status(400)
        .json({ error: USER_NOT_FOUND_ERROR, message: SIGN_UP_MSG });
    } else {
      res.status(200).json({ token: results[0].token });
    }
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};

const deleteUserByEmailOrPhn = async (req, res) => {
  try {
    const { email, phoneNumber } = req.query;
    const token = req.headers[AUTHORIZATION]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: MISSING_AUTHORIZATION });
    }

    const verified = jwt.verify(token, jwtSecretKey);

    if (!verified) {
      return res.status(401).json({ message: INVALID_AUTHORIZATION });
    }

    const query = { $or: [{ email }, { phoneNumber }] };
    const results = await signUpModel.deleteOne(query);
    if (!results.acknowledged) {
      return res.status(404).json({ error: USER_NOT_FOUND_ERROR });
    }

    res.status(200).json({ message: USER_DELETED });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, email, phoneNumber, newPassword, reEnterPassword } =
      req.body;

    // Check for missing keys
    // const requiredKeys = { userId, email };
    // const missingKeys = [];
    // for (let key in requiredKeys) {
    //   if (!requiredKeys[key]) {
    //     missingKeys.push(key);
    //   }
    // }
    // if (missingKeys.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ error: `Missing required keys: ${missingKeys.join(", ")}` });
    // }
    console.log(`Update`, req.body);
    // Check if user exists
    const user = await signUpModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ error: USER_NOT_FOUND });
    }
    if (newPassword !== reEnterPassword) {
      return res.status(400).json({ error: PASSWORD_MISMATCH });
    }
    // Verify password if provided
    if (newPassword && user.newPassword !== newPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Update fields
    const updatedFields = {};
    // if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
    if (newPassword) updatedFields.newPassword = newPassword;
    console.log("updatedFields", updatedFields);
    const updatedUser = await signUpModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
    res.status(200).json({
      message: "User details updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      },
    });
  } catch (error) {
    if (error._message) {
      return res.status(400).json({
        message: `${error._message.replace(
          "Signup",
          "Phone number"
        )}: must be 10 characters`,
      });
    } else if (error.keyPattern) {
      return res.status(400).json({
        message: `${Object.keys(error.keyValue).join(", ")}: must be unique`,
      });
    } else {
      return res
        .status(error.code || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUserByEmailOrPhn,
  getToken,
  deleteUserByEmailOrPhn,
  updateUser,
  getAllUsers,
};
