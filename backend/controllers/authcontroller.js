const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asynchandler = require("express-async-handler")
const auth = require("../models/authmodel")

const registerauth = asynchandler(async(req,res) => {

    const {name ,number, email, password} = req.body

    if(!name || !email || !password || !number){
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    const userexist = await auth.findOne({email:email})
    if(userexist){
        res.status(400)
        throw new Error("User Already Exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hasedpassword = await bcrypt.hash(password, salt);

    const user = await auth.create({
        name : name,
        number: number,
         email : email,
         password : hasedpassword,
    })

    if(!user){
        res.status(401)
        throw new Error("Invalide Data")
    }

   
    res.status(200).json({
        name: user.name,
        number: user.number,
        email: user.email,
        isadmin: user.isadmin,
        token: generatetoken(user._id),
    })

})

const loginauth = asynchandler(async(req,res) => {
    const {email,password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    const user = await auth.findOne({email:email})

    if(user && (await bcrypt.compare(password,user.password))){
    
        res.status(200).json({
            name: user.name,
            email: user.email,
            isadmin: user.isadmin,
            token: generatetoken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

})

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {registerauth,loginauth}