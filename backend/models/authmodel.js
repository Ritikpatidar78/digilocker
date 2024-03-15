const mongoose = require("mongoose")

const authschema = new mongoose.Schema({
    name:{
        type: String,
        require: [true,"Please fill the Name"]
    },
    number:{
        type: Number,
        require: [true, "Please fill the Number"]
    },
    email:{
        type: String,
        require: [true,"Please fill the Email"],
        unique: true
    },
    password:{
        type: String,
        require: [true,"Please fill the Password"]
    },
    isadmin:{
        type: Boolean,
        require: true,
        default: "false",
    },  
},
{
    timestamps:true
}
)

module.exports = mongoose.model("auth",authschema);