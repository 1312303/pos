const db = require("mongoose");


let UserAccountsSchema = db.Schema({
    TransacID: {type: String, required: true, unique: true},
    UserID: {type: String, required: true,unique: true},
    FirstName: {type: String, required: true},
    MiddleName: {type: String},
    LastName: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: Number, required: true},
});

let UserAccount = db.model("Products",UserAccountsSchema);
module.exports = UserAccount;
