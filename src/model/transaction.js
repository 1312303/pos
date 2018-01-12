const db = require("mongoose");


let TransactionSchema = db.Schema({
    TransacID: {type: String, required: true, unique: true},
    Date: {type: Date, default: Date.now},
    ProcessedBy: {type: String, required: true},
    Vatable: {type: Number, required: true },
    Change: {type: Number, required: true },
    Amount: {type: Number, required: true },
    TotalAmount: {type: Number, required: true },
    Subtotal: {type: Number, required: true }
});

let Transaction = db.model("Transactions",TransactionSchema);
module.exports = Transaction;