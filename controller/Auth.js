//signup -> 
//1 user exists?    2.hash pass   3dsave in db

const User = require("../model/User");
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
exports.signup=async(req,resp)=>
{
    console.log("HELLO");
    try
    {
        const {name,email,password,role}=req.body;

        // check if user present
        const exisitnguser=await User.findOne({email});
        if(exisitnguser)
        {
            return resp.status(400).json({
                success:false,
                message:'User Already Exisit',
            })
        }
        // HASH PASS
        console.log(password);
        let hashpass;
        try
        {
            hashpass=await bcrypt.hash(password,10);
            console.log(hashpass);
        }
        catch(err)
        {
            console.log(err);
            return resp.status(500).json({
                success:false,
                message:"ERROR IN HASHING PASS"
            })
        }
        const user=await User.create({
            name,email,password:hashpass,role
        })
        return resp.status(200).json({
            success:true,
            message:"USER CREATED SUCCESSFULLY"
        })
    }
    catch(err)
    {
        console.log(err);
        return resp.status(500).json({
            success:false,
            message:"USER CANT REGSITERD",
        })
    }
}
require('dotenv').config();
// LOGIC  
// 1. if pass or mail absent
//  2. if no user
//  3. compare 
//  4.resp+cookie(JWT)

exports.login=async(req,resp)=>
{
    try
    {
        const {email,password}=req.body;
        if(!email || !password)
        {
            return resp.status(400).json({
                success:false,
                message:"PLS ENTER ALL DETAILS"
            })
        }
        let user=await User.findOne({email});
        if(!user)
        {
            return resp.status(401).json({
                success:false,
                message:"USER NOT RESGISTERED",
            })
        }
        let payload=
        {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        if(await bcrypt.compare(password,user.password))
        {
            let token=jwt.sign(payload,process.env.secret);

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options={
                expires:new Date(Date.now() +1*60*1000*1000),
                httpOnly:true,
            }

            resp.cookie("NITISH",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"USER LOGGIN DONE"
            })
        }
    }
    catch(err)
    {
        resp.status(500).json({
            success:false,
            message:"LOGIN FAILED"
        })
    }
}