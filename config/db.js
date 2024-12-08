const mongoose=require("mongoose")

const MONGO_URL='mongodb://127.0.0.1:27017/restaurant'

mongoose.connect(MONGO_URL)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Database Connected!!")
})

db.on('error',(err)=>{
    console.log(console.log("error!!"),err)
})

db.on('disconnected',()=>{
    console.log("Disconnected to the database")
})

module.exports=db