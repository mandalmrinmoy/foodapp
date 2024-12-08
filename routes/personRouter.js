const express=require("express")
const router=express.Router()
const Person=require('../models/Person')

router.post('/signup',async (req,res)=>{
    try{
    const newPersonData=req.body;
    //validation
    if(!newPersonData.email || !newPersonData.name || !newPersonData.password || !newPersonData.usertype || !newPersonData.username){
        return res.status(404).json({message:"Please provide all data"})
    }
    // check user
    const emailId=await Person.findOne({email:newPersonData.email})
    if(emailId){
        return res.status(404).json({message:"Email already registered please login"})
    }
    const newPerson=new Person(newPersonData)
    const response=await newPerson.save()
    
    console.log("Successfully registered!!!")
    res.status(200).json({response:response})
    }catch(err){
        console.log(err)
        res.status(500).json({Error:"Internal Error!!"})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(404).json({message:"Please provide Email and Password"})
        }
        // chaeck user
        const user= await Person.findOne({email:email,password:password})
        if(!user){
            return res.status(404).json({message:"Enter the Valid Email Id or Password"})
        }
        res.status(200).json({message:"Login successfully!!",user})
    }catch(err){
        console.log(err)
        res.status(500).json({Error:"internal error!!"})
    }
})

module.exports=router