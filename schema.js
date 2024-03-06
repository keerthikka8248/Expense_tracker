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

const Userdetail_Schema = mongoose.Schema({
    
    username:{
        type : String
    },
    emailid:{
        type : String
    },
    password:{
        type : String
    }
})

const Expense = mongoose.model('expensedetail',ExpTrck_Schema)    //1st para--collection name 2nd -- schema
const User = mongoose.model('userdetail',Userdetail_Schema)
module.exports = {Expense,User} 


