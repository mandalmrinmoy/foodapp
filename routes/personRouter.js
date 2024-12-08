const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken")
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
    const userId=await Person.findOne({username:newPersonData.username})
    if(userId){
        return res.status(404).json({message:"Username already used"})
    }
    //hashing password
    let salt=bcrypt.genSaltSync(10)
    const hashPassword= await bcrypt.hash(newPersonData.password,salt)

    const newPerson=new Person(newPersonData)
    newPerson.password=hashPassword
    const response=await newPerson.save()
    
    console.log("congratulations!! Your profile created successfully")
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
        const user= await Person.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatch=bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"Invalid password"})
        }
       const token=JWT.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'1d'})
        res.status(200).json({message:"Login successfully!!",user,token})
    }catch(err){
        console.log(err)
        res.status(500).json({Error:"internal error!!"})
    }
})

module.exports=router