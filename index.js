
const bodyParser = require("body-parser");
const express = require("express");
const db = require("mongoose");
const app = express();
const Transactions = require("./src/model/transaction");
const Products = require("./src/model/product");
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
app.post("/register", function(request, response) {
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
app.post("/read", function(request, response) {
    
});
Transactions.find(function(err,data){
    if (data){
       console.log(data);
    }
    console.log(result);
});
app.listen(3000);
