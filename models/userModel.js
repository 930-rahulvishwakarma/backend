const mongoose = require("mongoose");
const email_validtor = require("email-validator");
const bcrypt = require('bcrypt');



// here i am linking the database using mongoose db

const db_link = "mongodb+srv://Admin:8dtSm8fbnbWlCu2m@cluster0.uqqfiqe.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(" database is conntected");
  })
  .catch((error) => {
    console.log(error);

  });

//  here i am creating collection schema //
//  which name is userschema //

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:function () {
      return email_validtor.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmpassword: {
    type: String,
    required: true,
    min: 8,
    validate:function () {
      return this.confirmpassword === this.password;
    }      
  },
  role:{
    type:String,
    enum:['admin','user','restro_owner','deliveryboy'],
    default:'user'
  },
  profile_page:{
    type:String,
    default:'../public/images/user.jpeg'
  }
});


// hooks in database
userSchema.pre('save', function () {
  this.confirmpassword = undefined;  
});

// userSchema.pre('save',async function() {
//   let salt = await bcrypt.genSalt();
//   let hashedStr = await bcrypt.hash(this.password , salt);
//   this.password = hashedStr;
// });


// Modal
// usermodal is a modal that we use for creating the modal
// mongoose modal is use for collection of our data base
// collection name , collection schema  //
const userModal = mongoose.model("userModal", userSchema);
module.exports = userModal;

//  (async function  createUser() {
//     let user ={
//         name:'Rahul vishwakarma',
//         email:'abced@gmail.com',
//         password:12345678,
//         confirmpassword:12345678
//     };

//     let data = await userModal.create(user);
//     console.log(data);
// })();
