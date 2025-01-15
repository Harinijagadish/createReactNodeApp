const signUpController = require("../Controllers/signUpController");
const router = require("express").Router();
//SIGNUP
router.post("/signUp", signUpController.signUpUser);

//LOGIN USER
router.post("/login", signUpController.loginUser);
//get USER DETAILS
router.get("/getUser", signUpController.getUserByEmailOrPhn);

//get all users

router.get("/getAllUsers", signUpController.getAllUsers);
//GET TOKEN
router.get("/getUserToken", signUpController.getToken);
//DELETE USER
router.delete("/deleteUser", signUpController.deleteUserByEmailOrPhn);

// UPDATE USER
router.put("/updateUser", signUpController.updateUser);
module.exports = router;
