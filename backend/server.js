const express = require("express");
const connectDB = require("./config/connectDb");
const app = express();
var cors = require('cors');
const { errorHandler } = require("./middleware/errorhandler");
require("dotenv").config();
const PORT = process.env.PORT || 4000

//Database connnect
connectDB()

//CORS policy
app.use(cors())

//Create a folder static
app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));

//Body-perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//authentication Routes
app.use("/api/auth",require("./routes/authroute"))

//Document routes
app.use("/api/document",require("./routes/docroute"))

//Errorhandler
app.use(errorHandler)

//free route
app.get("/", (req,res)=> {
    res.json({
        msg : "Task API"
    })
})

//lister server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})