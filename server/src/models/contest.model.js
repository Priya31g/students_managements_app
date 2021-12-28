const mongoose = require("mongoose");

const contestScema=new mongoose.Schema({
    day:{type:String,required:true},
    title:{type:String,required:true},
    type:{type:String,required:true},
    deadline:{type:Date,required:true},
    tags:[{type:String,required:true}],
    time :{type:String,required:true}
    
},{
    version:false
});
module.exports=mongoose.model("contest",contestScema)