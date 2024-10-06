const express=require('express');
const { signup, login } = require('../controller/Auth');
const { auth, isStudent, isAdmin } = require('../middleware/Auth');
const router=express.Router();


router.post("/su",signup);

router.get("/login",login);


router.get("/test",auth,(req,resp)=>
{
    resp.send("DONE DONE DONE DONE");
})

router.get("/studentportal",auth,isStudent,(req,resp)=>
{
    resp.send("WELCOME TO STUDENT PORTAL")
});



router.get("/adminportal",auth,isAdmin,(req,resp)=>
{
    resp.send("WELCOME TO ADMIN PORTAL")
});
    



module.exports=router;