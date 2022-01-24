const mongoose = require("mongoose")
const FoodSchema = new mongoose.Schema({
    FoodName: {
        type : String,
        required : true,
    },
    days : {
        type : Number,
        required : true,
    },
});

const Food = mongoose.model("Food",FoodSchema);  //new collection will create with name "Foods"
module.exports = Food;