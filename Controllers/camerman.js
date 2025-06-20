const Cameraman = require("./../models/cameraMan");
const {getToken ,} = require("./../Services/auth")

async function handleLoginCameraMen(req , res){
    const {email , password } = req.body;
    try {
        console.log(email , password)
        const user = await Cameraman.findOne({ "contactDetails.email": email });

       if(!user){
        return res.status(404).json({message : "No such user"});
       }
     
       if (user.password === password){
        const payload = {userName : user.Name , userId : user._id , role : "cameraman"};
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


module.exports = {handleLoginCameraMen ,}