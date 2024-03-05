const express = require('express')
const { mongoose } = require('mongoose')
const app = express()
const {Expense} = require('./schema.js')
const bodyParser = require('body-parser')
const cors = require("cors")
app.use(bodyParser.json())
app.use(cors())

//Mongoose -- DB connection -- Schema Declaration -- Queries Execution
const port = process.env.PORT || 8000
async function connectiontoDB(){
    try{
    await mongoose.connect('mongodb+srv://KeerthikkaS:0o8u6t4e2q@cluster0.ka4dlmb.mongodb.net/Expense_Tracker?retryWrites=true&w=majority&appName=Cluster0')

    app.listen(port,function(){
    console.log(`Listening to port ${port}`)
    })
    }
    catch(error){
        console.log("couldn't establish connection")
    }
}
connectiontoDB()

app.post('/addExpense', async function(request,response){
    try{
        await Expense.create({
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(201).json({"status":"success","msg":"value added"})
        console.log(request.body)
    }
    catch(error){
        response.status(500).json({"status":"failure","msg":"couldn't add value","Error": error})
    }
    
})

app.get('/findExpense', async function(request,response){
    try{
        const Expensedata = await Expense.find()
        response.status(200).json(Expensedata)
    }
    catch(error){
        response.status(500).json({
            "status":"failure",
            "msg":"couldn't find values",
            "Error":error
        })
    }
})

app.delete('/deleteExpense/:id',async function(request,response){
    const expenseId = Expense.findById(request.params.id)
    if(expenseId){
        try{
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
            "status":"Success",
            "msg":"Value deleted"
        })
        }
        catch(error){
            response.status(500).json({
                "status":"Failure",
                "msg":"Couldn't delete value",
                "Error":error
        })
        
        }
    }
    else{
        response.status(404).json({
            "status":"Failure",
            "msg":"Value not found"
    })
    }
})

app.patch('/editExpense/:id',async function(request,response){
    const Expenseid = await Expense.findById(request.params.id)
    if(Expenseid){
        try{
            await Expenseid.updateOne({
                "amount":request.body.amount,
                "category":request.body.category,
                "date":request.body.date
            })
            response.status(200).json({
                "status":"success",
                "msg":"value updated"
            })
        }
        catch(error){
            response.status(500).json({
                "status":"Failure",
                "msg":"Couldn't update value due to server error",
                "Error":error
        })
        }
        
    }
    else{
        response.status(404).json({"status":"Failure",
        "msg":"couldn't found id"})
    }
})

// const http = require("http")

// //runs the application in the particular port number
// http.createServer(function(request,response){                  //request-meta data   response-object
    
//     response.writeHead(200,{'Content-Type':'text/html'})        //statusCode- (404-error)(200-Proper file -OK) - response status
//     response.write("Hello")                                       //meta data
   
//     response.end()
// }).listen(5000)                              //this application runs in portnum - 8000

