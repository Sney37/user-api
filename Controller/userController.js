const User = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//getData
exports.getData = async (req,res)=>{
    try {
        const data = await User.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}

//postData//register
exports.postData = async (req,res)=>{
    try {
        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist)return res.status(400).json({errors:true,error:"user already exist"})


        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)

        const data = await User.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
        
    }
}

//updateData
exports.updateData = async (req,res)=>{
    try {
        const data = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}

//deleteData
exports.deleteData = async (req,res)=>{
    try {
        const data = await User.findByIdAndDelete(req.body.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:false,error:error.message})
    }
}

//login
exports.login = async (req,res)=>{
    try {
        const userExist = await User.findOne({email:req.body.email})
        if(!userExist)return res.status(400).json({errors:true,error:"email or password is invalid"})

        const validPassword = await bcrypt.compare(req.body.password,userExist.password);
        if(!validPassword)return res.status(400).json({errors:true,error:"email or password is invalid"})

        const token = await jwt.sign({id:userExist._id},process.env.SEC)

        return res.json({errors:false,data:{User:userExist,token:token}})

    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}