const expressAsyncHandler = require("express-async-handler");
const auth = require("../models/authmodel");
const doc = require("../models/docmodels");

const getalldoc = expressAsyncHandler(async(req,res) =>{
    //user from jwt
    const user = await auth.findById(req.auth._id)

    if(!user ){
        res.status(401)
        throw new Error("User Not Found")
    }

    //get documents by userid
    const documents = await doc.find({user: req.auth._id})

    if(!documents){
        res.status(400)
        throw new Error("No Documents Found")
    }

    res.status(200).json(documents)
    

})
const getsingledoc = expressAsyncHandler(async(req,res) =>{
    //user from jwt
    const user = await auth.findById(req.auth._id)

    if(!user ){
        res.status(404)
        throw new Error("User Not Found")
    }

 
    //get single document by id
    const document = await doc.findById(req.params.id)

    if(!document || document.user.toString() !== user._id.toString()){
        res.status(404)
        throw new Error("Document not Found")
    }

    res.status(200).json(document)
    

})
const createdoc = expressAsyncHandler(async(req,res) =>{

    //check req
    const {title , description } = req.body

    if(!title || !description ) {
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    //get user
    const user = await auth.findById(req.auth._id)

    if(!user){
        res.status(404)
        throw new Error("User Not Found")
    }


    //create document
    const document = await doc.create({
        user: req.auth._id,
        title: title,
        description: description,
        coverimg: req.file.path
    })

    if(!document){
        res.status(400)
        throw new Error("Invalid Data")
    }

    res.status(200).json(document)

})
const updatedoc = expressAsyncHandler(async(req,res) =>{

    //get user
    const user = await auth.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    //get document
    const data = await doc.findById(req.params.id)

    if(!data){
        res.status(400)
        throw new Error("Document not found")
    }

 
    //verify document and user
    if(user._id.toString() !== data.user.toString()){
        res.status(400)
        throw new Error("Unauthorized")
    }

    //update document
    const document =  await doc.findByIdAndUpdate(data._id, req.body ,{new:true})

    if(!document){
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    res.status(200).json(document)


})
const deletedoc = expressAsyncHandler(async(req,res) =>{

    
    //get user
    const user = await auth.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    //get document
    const data = await doc.findById(req.params.id)

    if(!data){
        res.status(400)
        throw new Error("Document not found")
    }

    //verify user and document
    if(user._id.toString() !== data.user.toString()){
        res.status(400)
        throw new Error("Unauthorized")
    }

    //delete document
    const document = await doc.findByIdAndDelete(data._id)

    res.status(200).json({msg:"Success"})


})

module.exports = {getalldoc,getsingledoc,createdoc,updatedoc,deletedoc}