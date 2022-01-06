const express = require('express');
const router = express.Router();

const admin = require("../models/admin.model");

router.get("",async (req,res)=>{
    const ad = await admin.find().lean().exec();
    res.send(ad);
})

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
       
        if(email.indexOf(".masaischool.com", email.length - ".masaischool.com".length) !== -1){
            return true;
        }
    }
    return false;
}

router.post("",
async (req,res)=>{
    
    if(validateEmail(req.body.email)){
        let ad = await admin.create(req.body);
        res.send(ad);
    }else{
        res.send({error:"Oops! sorry you can't login email.You need Masai Email Id to Login in to Admin Panel"})
    }

})

router.get("/:id",async (req,res)=>{
    const ad = await admin.findById(req.params.id);
    res.send(ad);
})

router.delete("/:id",async (req,res)=>{
    const ad = await admin.findByIdAndDelete(req.params.id);
    res.send(ad);
})
module.exports = router;