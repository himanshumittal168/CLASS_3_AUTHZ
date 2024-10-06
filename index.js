const express=require('express');


const xyz=require("./routes/route");
const app=express();


require('dotenv').config();
app.use(express.json());
const PORT=process.env.port;

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/base",xyz);
require('./config/database').connect();
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})