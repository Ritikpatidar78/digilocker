const mongoose = require("mongoose")
const authmodel = require("./authmodel")

const docschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: authmodel,
    },
    title:{
        type: String,
        require: [true,"Please give the title"]

    },
    description:{
        type: String,

    },
    coverimg:{
        type: String,
        require: [true,"Please upload the img"],
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("document", docschema)