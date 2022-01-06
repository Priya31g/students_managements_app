const express= require('express');
const authenticate = require('../middleware/authenticate');
const router= express.Router();

const {body,validationResult} = require("express-validator");
const students = require("../models/student.model");

router.get("",async function(req,res){
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    const  stud =await students.find().skip(offset).limit(size).lean().exec();
 
    const totalUserCount = await students.find().count();
    const total_pages=Math.ceil(totalUserCount/size);
 
     
       
    return res.send({students:stud,total_pages});
 });

 router.get("/sort_student_age",async (req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    
    let stud = await students.find().sort({age:1}).skip(offset).limit(size).lean().exec();
    const totalUserCount = await students.find().count();
    const total_pages=Math.ceil(totalUserCount/size);
 
     
       
    return res.send({students:stud,total_pages});
})

router.get("/sort_student_name",async (req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    
    let stud = await students.find().sort({name:1}).skip(offset).limit(size).lean().exec();
    const totalUserCount = await students.find().count();
    const total_pages=Math.ceil(totalUserCount/size);
 
     
       
    return res.send({students:stud,total_pages});
})

router.get("/filter_name",async (req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    const con = await students.find({name:req.query.name}).skip(offset).limit(size).lean().exec();
    const totalUserCount = await students.find().count();
    const total_pages=Math.ceil(totalUserCount/size);
 
     
       
    return res.send({students:con,total_pages});
})


router.get("/filter_age",async (req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    
    const con = await students.find({age:req.query.age}).skip(offset).limit(size).lean().exec();
    const totalUserCount = await students.find().count();
    const total_pages=Math.ceil(totalUserCount/size);
 
     
       
    return res.send({students:con,total_pages});
})


router.post("",authenticate,
body("name").notEmpty().withMessage("name is required"),
body("city").notEmpty().withMessage("city is required"),
body("age").notEmpty().isInt({min:18 ,max:100}).withMessage("minimum age is 18"),
body("gender").notEmpty().withMessage("gender is required"),

body("education").notEmpty().withMessage("education is required"),
body("contact").notEmpty().isLength({min:10,max:10}).withMessage("accepts only 10 digit contact no"),
async (req,res)=>{
    const errors = validationResult(req);
        let final_error=null;
        if(!errors.isEmpty()){
            console.log(errors)
            final_error=errors.array().map(errors=>{
                return {
                    param:errors.param,
                    msg:errors.msg,
                    value:errors.value
                }
            })
            return res.status(400).json({error:final_error});
        }
        console.log(final_error)
    const stud= await students.create(req.body);
    console.log(stud)
    res.send(stud);
})

router.get("/:id",async(req,res)=>{
    const stud =  await students.findById(req.params.id);
    res.send(stud);
})

router.delete("/:id",async (req,res)=>{
        const stud = await students.findByIdAndDelete(req.params.id);
        res.send(stud);
})


module.exports = router;