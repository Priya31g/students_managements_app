const mongoose = require("mongoose");

const studentsSchema=new mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    education:{type:String,required:true},
    contact:{type:String,required:true}
    
},{
    version:false
});
module.exports=mongoose.model("student",studentsSchema)