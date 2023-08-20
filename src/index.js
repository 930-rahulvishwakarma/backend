const express = require("express");
const app = express();
// const authRouter = require('../Routers/authRouter');
const userRouter = require('../Routers/userRouter');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
  console.log("port is live now at 3000");
});

// ------------------------------------signup page Router ----------------------------------------------- //
// app.use("/auth", authRouter);

// ------------------------------------user page Router that is our home page ----------------------------------------------- //
app.use("/", userRouter);
