const express=require("express")
const dotenv=require("dotenv").config()
const db=require("./config/db")
const app= express()

const bodyParser=require("body-parser")
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.status(200).send("<h1>Welcome Sir!!!<h1/>")
})
// import person
const personRouter=require("./routes/personRouter")
app.use('/person',personRouter)

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("Server is running")
})