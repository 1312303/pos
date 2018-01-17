
const bodyParser = require("body-parser");
const express = require("express");
const db = require("mongoose");
const app = express();
const Transactions = require("./src/model/transaction");
//const Products = require("./src/model/product");
const UserAccounts = require("./src/model/user_accounts");
const api = express.Router();
//const jwt = require("jsonwebtoken");

db.connect("mongodb://localhost:27017/db_pos", function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("NICE");
  }
});


app.use(bodyParser.json());
const result = { status: "failed" };
// Register
api.post("/register", function(request, response) {
  console.log(request.body); // your JSON
  const {
    TransacID,
    ProcessedBy,
    Vatable,
    Change,
    Amount,
    TotalAmount,
    Subtotal
  } = request.body;
  let newTransac = new Transactions({
    TransacID,
    ProcessedBy,
    Vatable,
    Change,
    Amount,
    TotalAmount,
    Subtotal
  })
  newTransac.save(function(err){
      if (err){
          response.send(result);
      }
      response.send(result.status="success");
  })
});
// Read
api.post("/read", function(request, response) {
  Transactions.find({},function(err,data){
    if (err){
      response.send(result);
    }
    else {
      response.json(data);
    }
  });
});

app.use('/api',api);
app.listen(3000);
