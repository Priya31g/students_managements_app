const passport=require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require("dotenv").config();
const {v4:uuidv4}=require("uuid");




const admin=require("../src/models/admin.model")
const {newToken} = require("../src/Controllers/authcontroller")



passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2020/auth/google/callback",
    // userProfileURL:"",
    // passReqToCallback   : true
  },

 async function(request, accessToken, refreshToken, profile, done) {

const email= profile?._json?.email;
console.log(email)
let user;
try{
    user = await admin.findOne({email}).lean().exec();
if(!user){
    
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
           
            if(email.indexOf(".masaischool.com", email.length - ".masaischool.com".length) !== -1){
                user=await admin.create({
                    email:email,
                    password:uuidv4()
                })
            }
       
       
    }
   
}
const token = newToken(user);
console.log(user,token)
if(user!==null)
return done(null,{user,token})
else
return done(null,"sorry,you can't log in");
}
catch(err){
console.log(err)
}
 }
    
));

module.exports=passport;