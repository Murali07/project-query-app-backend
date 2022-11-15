var express = require('express');
var router = express.Router();

require('dotenv').config();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const { mongoose, userModel, queryModel } = require("../config/dbSchema");
const { 
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validateToken,
  adminGaurd 
} = require("../config/auth");
const { RouterProvider } = require('react-router-dom');

mongoose.connect(dbUrl);

router.get("/", validateToken, adminGaurd, async (req, res) => {
  res.send({
    statusCode: 200,
    message: "Valid Token"
  })
})

router.post("/signup", async (req, res) => {
  try{
    let users = await userModel.find({email: req.body.email});
    if(users.length > 0){
      res.send({
        statusCode: 400,
        message: "User Already Exists",
      })
    }else{
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      let user = await userModel.create(req.body);
      res.send({
        statusCode: 200,
        message: "User Creation Successfull!",
        user
      })
    }
  } catch(error){
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error
    })
  }
})

router.post("/login", async (req, res) => {
  try{
    let user = await userModel.findOne({ email: req.body.email });
    if(user){
      let validatePwd = await hashCompare(req.body.password, user.password);
      if(validatePwd){
        let token = await createToken({ email: user.email, role: user.role });
        res.send({
          statusCode: 200,
          message: "Login Successful",
          role: user.role,
          token
        })
      } else {
        res.send({
          statusCode: 401,
          message: "Incorrect Password",
        })
      }

    } else{
      res.send({
        statusCode: 400,
        message: "User Does Not Exists"
      })
    }
  } catch(error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error
    })
  }
})

module.exports = router;
