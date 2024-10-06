const jwt=require('jsonwebtoken');

require('dotenv').config();


exports.auth=(req,resp,next)=>
{
    // 

    const token=req.cookies.NITISH;
                // req.body.token ||
                // req.header("Authorization").replace("Bearer ","");
    
                //  ||
                // 
    console.log(token);
    if(!token || token ==undefined)
    {
        return resp.status(401).json({
            sucess:false,
            msg:"Token Missing/ Token is Not Valid"
        })
    }

    try
    {
        const payload=jwt.verify(token,process.env.secret);
        console.log(payload);
        req.user=payload;
    }
    catch(err)
    {
        resp.send("ERROR");
    }
    // resp.send("AUTH DONE");  
    next();
}


exports.isStudent=(req,resp,next)=>
{
    try
    {
        if(req.user.role==="Admin")
            next();
        if(req.user.role!=="Student")
        {
            return resp.status(401).json({
                sucess:false,
                msg:"YOU ARE NOT ALLOWED TO VIEW"
            })
        }
        next();
    }
    catch(err)
    {
        return resp.status(500).json({
            sucess:false,
            msg:"ERROR",
        })
    }
}

exports.isAdmin=(req,resp,next)=>
    {
        try
        {
            if(req.user.role!=="Admin")
            {
                return resp.status(401).json({
                    sucess:false,
                    msg:"YOU ARE NOT ALLOWED TO VIEW"
                })
            }
            next();
        }
        catch(err)
        {
            return resp.status(500).json({
                sucess:false,
                msg:"ERROR",
            })
        }
    }