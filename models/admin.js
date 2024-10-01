const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name : {
        type : String ,

    } ,
    email : {
        type : String ,
        unique: false,
    } ,
    pswd : {
        type : String ,
        
    } ,
  });
  
const admin = mongoose.model("admin" , adminSchema);

module.exports = {
    admin,
}