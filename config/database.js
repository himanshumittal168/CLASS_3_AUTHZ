const mongoose=require('mongoose');

require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.url)
    .then(()=>console.log("CONNECTED TO DB"))
    .catch((err)=> {console.log("CANT CONNECT TO DB")});
}