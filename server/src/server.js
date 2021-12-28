const express = require("express");

const connect = require("../config/db");

const app = express();
app.use(express.json());

app.listen(2020,async ()=>{
  let data= await  connect();
    console.log("listening on port 2020")
})