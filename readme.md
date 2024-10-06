1. AuthN AuthZ 
    AuthN-Verification of Identity
    AuthZ- Permission granteed to User

2. MiddleWare
    Client -----> REQ-----MIDDLE WARE------>--- Server
    SERVER ------> (FIRST TIME)RESPONSE+(JWT TOKEN through Cookie)--->--- Client


    Client ------->REQ(COOKIE)---------> server
    


3. JWT Token
    1. Header 2. Payload 3. Signature

4. BCRYPT- bcrypt.hash(pass,10);
           bcrypt.compare 
           npm i bcrypt

           npm i jsonwebtoken


    jwt.sign(payload,secretkey); 



Token from where
    1. From header      
    2. From Req Body   -> express.json()
    3. From Cookie.token    -> cookieparser

    OR- any true i am true