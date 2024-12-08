
const mongoose=require("mongoose")

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        // default:"client",
        enum:['client','chef','manager','deliver boy','waiter']

    }
})

const Person=mongoose.model('Person',personSchema)

module.exports= Person