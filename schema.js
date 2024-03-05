//DB Schema -- modularity

const mongoose = require("mongoose");

const ExpTrck_Schema = mongoose.Schema({
    amount:{
        type : Number
    },
    category:{
        type : String
    },
    date:{
        type : String
    }
})

const Expense = mongoose.model('expensedetail',ExpTrck_Schema)    //1st para--collection name 2nd -- schema
module.exports = {Expense} 