const {admin} = require("./../models/admin")
const {getToken ,} = require("./../Services/auth")

async function handleadminLogin(req , res){
    const {email , password } = req.body;
    try {
        console.log(email , password)
       const user = await admin.findOne({email : email});
       console.log(user)
       if(!user){
        return res.status(404).json({message : "wrong email"});
       }
     
       if (user.pswd === password){
        console.log("password match")
        const payload = {userName : user.name , userId : user._id , role : "admin"};
        console.log("payload filled")
        const token = getToken(payload);

        console.log(token)
        res.cookie("authToken" , token)
        
        return res.redirect("/home")
        
       }
       res.status(401).json({message : "wrong password"});
    }
    catch(err){
        res.status(500).json({message : "Internal server error"});
    }
}

module.exports = {handleadminLogin ,}