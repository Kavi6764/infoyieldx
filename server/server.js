const express =require("express")
const cors = require("cors")
const app =express();
const mongoose = require("mongoose")
const ContactRouter =require("./Router/ContactRouter")
const HRRouter = require("./Router/HRRouter")
const EmployeeRouter = require("./Router/EmployeeRouter")
const path = require("path")
const Auth = require("./Auth/authHR")
const Leave = require("./Router/LeaveRouting")
const ChatBot = require("./Router/ChatbotRouter")
const Carrer  =require("./Router/CarrerPortal")
require("dotenv").config()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DataBase Concting")
}).catch((err)=>{
    console.error(err);
    
})
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

//Routing
app.use("/api/HR",HRRouter)
app.use("/api/contact",ContactRouter)
app.use("/api/employee",EmployeeRouter)
app.use("/api/auth",Auth)
app.use("/api/leave",Leave)
// app.use("/api/chatbot",ChatBot)
app.use("/api/carrer-portal",Carrer)

app.listen(5000,()=>{
    console.log("port runing")
})
