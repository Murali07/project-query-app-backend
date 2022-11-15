var express = require('express');
var router = express.Router();

require('dotenv').config();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const { mongoose, userModel, queryModel } = require("../config/dbSchema");

mongoose.connect(dbUrl);

console.log("Mongo is connected");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create-ticket", validateToken, adminGaurd, async(req, res) => {
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

module.exports = router;
