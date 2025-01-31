const Users = require('../model/userModel')
const bcrypt = require('bcrypt')

const getUsers = async(req,res)=>{
    try{
        const users = await Users.find()
        if(!users){
            return res.status(400).json({msg:"No Users Found"})
        }
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({msg:"Something went wrong" + error})
    }
}

const postUsers = async(req,res)=>{
    try{
        const {name, password} = req.body
        if(!name || !password) return res.status(400).json({msg:"Enter Name And Password"})

        const user = await Users.findOne({name})
        if(user) return res.status(409).json({msg:"User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new Users({name, password: hashPassword})
        await newUser.save();

        res.status(201).json({user: newUser})
    }catch(err){
        res.status(500).json({msg:err || "Something"})
    }
}


const login = async(req,res) =>{
    try{
        const {name, password} = req.body
        if(!name) return res.status(400).json({msg:"Enter Name"})
        if(!password) return res.status(400).json({msg:"Enter Password"})

        const user = await Users.findOne({name})
        if(!user) return res.status(400).json({msg: "Please Register."})
        // console.log(user)

        const isValidPassword = await bcrypt.compare(password, user.password,)
        // console.log(isValidPassword)
        if(!isValidPassword) return res.status(400).json({msg: "Invalid Password."})


        res.status(200).json({msg:"Login Successfull", userId: user._id, name: user.name})

    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
}

module.exports = {getUsers, postUsers, login}
