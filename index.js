
const bodyParser = require("body-parser");
const express = require("express");
const db = require("mongoose");
const app = express();
const morgan = require("morgan");
const api = express.Router();
const jwt = require("jsonwebtoken");

const Transactions = require("./src/model/transaction");
//const Products = require("./src/model/product");
const config = require("./src/config");
const UserAccounts = require("./src/model/user_accounts");


db.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("NICE");
  }
});
app.set('secret',config.secret);


app.use(bodyParser.json());
app.use(morgan('dev'));


const result = { status: "failed" };
// Register
api.post("/insert", function(request, response) {
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

api.post('/authenticate',function(request,response){
  UserAccounts.findOne({username: request.body.username},function (err,user) {
    if (err) {
      response.send(result);
    } 
    if (!user) {
      response.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != request.body.password){
        response.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const payload = {
          user : user.username
        };
        let token = jwt.sign(payload, app.get('secret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        response.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
});

api.post("/addUser",function(request,response){
  console.log(request.body);
  const {
    transacID,
    userID,
    firstName,
    middleName,
    lastName,
    username,
    password,
    userType
  } = request.body;
  let newUser = new UserAccounts({
    transacID,
    userID,
    firstName,
    middleName,
    lastName,
    username,
    password,
    userType
  });
  newUser.save(function(err){
    if (err){
        response.send(result);
    }
    response.send(result.status="success");
  });
});

app.use('/api',api);
app.listen(3000);
