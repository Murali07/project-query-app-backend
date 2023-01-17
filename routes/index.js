var express = require('express');
var router = express.Router();

require('dotenv').config();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const { mongoose, userModel, queryModel, categoryModel } = require("../config/dbSchema");

const { 
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validateToken,
  adminGaurd 
} = require("../config/auth");

mongoose.connect(dbUrl);

console.log("Mongo is connected");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create-ticket", async(req, res) => {
  try{
    let ticket = await queryModel.create(req.body)
    res.send({
      statusCode: 200,
      message: "Ticket Created Successfully",
      ticket
    })

  }
  catch(error){
    res.send({
      starusCode: 500,
      message: "Internal Server Error",
      error
    })
  }
  
})

router.post("/query-category", async(req, res) => {
  try{
    let category = await categoryModel.create(req.body)
    res.send({
      statusCode: 200,
      message: "Query category created successfully!",
      category
    })
  }
  catch(error){
    console.log(error);
    res.send({
      StatusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
})

router.get("/query-category/:id", async(req, res) => {
  try {
    let issue = await categoryModel.findOne({_id:mongodb.ObjectId(req.params.id)});
    res.send({
      statusCode: 200,
      issue
    })
  } catch (error) {
    console.log(error);
    res.send({
      StatusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
})



module.exports = router;
