const express = require("express");
const cors = require('cors')
const passport= require("../config/passport");
const connect = require("../config/db");
const contestController = require("./Controllers/contest.controller");
const studentController = require("./Controllers/students.controller");
const adminController = require("./Controllers/admin.controller");
const authContoller = require("./Controllers/authcontroller");

const app = express();
app.use(express.json());

const {newToken} = require("./Controllers/authcontroller")

const admin = require("./models/admin.model")
const {signin,signup} =require("./Controllers/authcontroller");

app.use(passport.initialize());
app.use(cors())
passport.serializeUser(function({user,token},done){
    done(null,{user,token})
})

passport.deserializeUser(function({user,token},done){
    done(err,{user,token})
})


app.get("auth/google/failure",function(req,res){
    return res.send("Something went wrong")
})

app.get("/auth/google/success", async function(req,res){
    let user=await admin.findOne().lean().exec();
    console.log(profile);
    let token= newToken(user)
    return res.send({user,token})
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
     ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        //   successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}),function (req,res){
    console.log("user",req.user);
    let user= req.user;
  
  return res.send(user)
});

app.get("/",(req,res)=>{
    res.send("hello")
})
app.post("/signin",signin);
app.post("/signup",signup);
app.use("/contest",contestController);
app.use("/students",studentController);
app.use("/admin",adminController);

app.listen(2020,async ()=>{
  let data= await  connect();
    console.log("listening on port 2020")
})