const userModal = require("../models/userModel");


module.exports.getuser = async function getuser(req, res) {
  console.log("yes");
  let id = req.body.id;
  console.log(id);
   
  let user = await userModal.findById(id);
  // console.log(user);
  if (user) {
    return res.json(user)
  } else {
   return res.json({
    message:"from user function usr is not found"    
   }) 
  }
  
};

module.exports.getAllusers = async function getAllusers(req,res) {
  let getAllusers = await userModal.find();
  if (getAllusers) {
    res.send({
      message:getAllusers
    })
  } else {
    res.send({
      message:"users not found"
    })
  }
}

// function deleteuser(req, res) {}

// module.exports.setcookies = function setcookies(req,res) {
//   // res.setHeader("set-Cookie","islogin = true");
//   res.cookie('login',true,{httpOnly:true,secure:true})
//   res.send('cookies are set')
// }

// module.exports.getcookies = function getcookies(req,res) {
//   let cookies = req.cookies.login;
//   console.log(cookies);
//   res.send("cookies send");
// }
// let flag = false;
// let isloggedIn;
