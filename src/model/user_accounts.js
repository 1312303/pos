const db = require("mongoose");


let UserAccountsSchema = db.Schema({
    transacID: {type: String, required: true, unique: true},
    userID: {type: String, required: true,unique: true},
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true}
});

let UserAccount = db.model("userAccounts",UserAccountsSchema);
module.exports = UserAccount;
