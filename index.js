const express = require("express")
const mongoose = require("mongoose")
const {connection} = require("./db")
// const {userRouter} = require("./routes/User.routes")
const { bugsRoute } = require("./routes/Bugs.route")
const { userRouter } = require("./routes/User.routes")
const app = express()
app.use(express.json())
// const port= 8080;

app.use("/api", userRouter)
app.use("/api", bugsRoute)

app.get("/",(req,res)=>{
    res.send("Hiii")
})

app.listen(8080,async()=>{
    try{
        await connection
        console.log('connected to DB')
        console.log(`server is running at port no 8080`)
    }catch(err){
        console.log(err)
    }
})

module.exports={app}