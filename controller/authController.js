const userModal = require("../models/userModel");
// const path = require("path");

const jwt = require('jsonwebtoken');
const jwt_key = "dbuqidh2ey1u09u3pjdoi";

// const staticPath = path.join(__dirname, "../public/index.html");

//--------------------------------------------- getting form page -----------------------------------------------------
// module.exports.getsignup = function getsignup(req, res) {
//   res.sendFile(staticPath);
// };




//--------------------------------------------- user signup function -----------------------------------------------------

module.exports.signup = async function signup(req, res) {
try {
  let obj = req.body;
  let userData = await userModal.create(obj);
  res.json({
    message: "successfully posted the data",
    data: userData,
  });  
} catch (error) {
  console.log(error);
  res.json({
    message:error
  })
}
};

//---------------------------------------------- user login function ---------------------------------------------------------
module.exports.login = async function login(req, res) {
  let data = req.body;
  let current_userdata = await userModal.findOne({ email: data.email });
  try {
    if (current_userdata) {
      if (data.password == current_userdata.password) {
        let uid = current_userdata["_id"];
        let jwt_sign = jwt.sign({payload:uid},jwt_key);
        res.cookie('islogin',jwt_sign,{httpOnly:true});
        // console.log(cookie);
        return res.json({
          message: "loged in sir",
          userDetails: current_userdata,
        });
        console.log("loged in");
      } else {
        return res.json({
          message: "wrong details",
        });
        console.log("not loged in");
      }
    } else {
      return res.json({
        message: "something went wrong",
      });
      console.log("not loged in");
    }
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------- authorised function ---------------------------------------------------------
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req,res,next) {
    if (roles.includes(req.role == true)) {
      next();
    } else {
      return res.json({
        message:"operation is not allowed"
      })
    }
  }
}

//---------------------------------------------- protect route function ---------------------------------------------------------
module.exports.protectRoute = async function protectRoute(req , res , next) {
  try {
    let token;
    if (req.cookies.islogin) {
     token = req.cookies.islogin;
     let payload = jwt.verify(token,jwt_key);
     if (payload) {
       const user = await userModal.findById(payload.payload);
       req.role = user.role;
       req.id = user.id;
      //  console.log("here i a, printing the user id and role >    " +user.id +"  "+ user.role);
      //  console.log(req.role +" "+ req.id);
      //  res.json({
      //   message:user
      //  })
      next();
      }else{
       return res.json({
        message:"user not found"
       })
      }
    }
    else{
      res.json({
        message:"not allowed login first",
        // message:"plz login first"
      });
    }
    
  } catch (error) {
    console.log(error);
  }
}  

