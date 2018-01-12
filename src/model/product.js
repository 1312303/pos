const db = require("mongoose");


let ProductSchema = db.Schema({
    TransacID: {type: String, required: true, unique: true},
    ShortenedName: {type: String, required: true},
    ProductName: {type: String, required: true},
    Quantity: {type: Number, required: true},
    Price: {type: Number, required: true},
});

let Product = db.model("Products",ProductSchema);
module.exports = Product;
