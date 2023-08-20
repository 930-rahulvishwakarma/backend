const express = require("express");
const app = express();

const {getuser,getAllusers,updateUser,deleteUser} = require('../controller/userController');
const userRouter = express.Router();
const {signup,login,isAuthorised,protectRoute} = require('../controller/authController');

// ------------------------------------------ route for the user options --------------------------------------
userRouter
.route('/signup')
.post(signup)

// ------------------------------------------ route for the user options --------------------------------------
userRouter
.route('/login')
.post(login)

// ------------------------------------------ route for the user options --------------------------------------
// userRouter
// .route('/:id')
// .delete(deleteUser)
// .patch(updateUSser)

// ------------------------------------------ route for the user profile --------------------------------------

userRouter.use(protectRoute);
userRouter
.route('/getuser')
.get(getuser)


// ------------------------------------------ route for the admin --------------------------------------
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllusers)



// 8dtSm8fbnbWlCu2m

module.exports = userRouter;

// 