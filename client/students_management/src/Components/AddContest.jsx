import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Redirect} from "react-router-dom";


export const AddContest =()=>{
    const [day,setDay] = useState("");
    const [title,setTitle] = useState("");
    const [type,setType] = useState("");
    const [deadline,setdeadline] = useState("");
    const [tags,setTags] = useState("");
    const [time,setTime] = useState("");
   const token = JSON.parse(localStorage.getItem("b_token"))
    const handleSubmit =async ()=>{
        if(day===""||title===""||type===""||deadline===""||tags.length===0||time===""){
        alert("Fill all data Correctly")
    }else{
       
        
        
        console.log(tags)
        let body_p = {
             day:day,
             title:title,
             type:type,
             deadline:deadline,
             tags:tags,
             time :time
    
        }
         console.log(body_p);
         try{

           
            fetch("http://localhost:2020/contest",{
                method: "POST",
               body: JSON.stringify(body_p),
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json"   
                }
            }).then(response => response.json())
                .then(json => {console.log(json);
                    alert(`Successfully added👏`)})  
                .catch((err)=>{
                    alert(`Ooops! Something Went Wrong!😑
                        ${err[0].msg}`)
                })          
           
           
         }catch(err){
             console.log(err)
                alert(`Ooops! Something Went Wrong!😑
                ${err[0].msg}`)
         }
         

    }
       
    }
    if(token===""||token===null){
        return  <>
        <h2>Needs To Sign Up First</h2>
        <Redirect to="/signup" />
        </>
    }

    return (
        <>
            <Box  sx={{
                     display: 'flex',
                    flexWrap: 'wrap',
                     '& > :not(style)': {
                       m: 1,
                       padding:"15px",
                       alignItems:"center",
                       margin:"2% 30%",
                       width:"40%"
                      },
                    }}
                 >
                 
                 <Card sx={{ minWidth: 275 }} >
                       
                        <TextField  sx={{width:"85%",
                     margin:"2% 10%",
                       padding:"15px",
                       alignSelf:"center"
                     
                    }}
          required
          id="outlined-required"
          label="Day" placeholder="Day" onChange={(e)=>{
                            setDay(e.target.value);
                        }} />

                        <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Title" placeholder="Title" onChange={(e)=>{
                            setTitle(e.target.value);
                        }} />

<br/>
<TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Type" placeholder="Type" onChange={(e)=>{
                            setType(e.target.value);
                        }} />

<br/>
                      
                            <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Deadline" placeholder="Deadline" onChange={(e)=>{
                            setdeadline(e.target.value);
                        }} />
                            <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Start Time" placeholder="Start Time" onChange={(e)=>{
                            setTime(e.target.value);
                        }} />

<br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Tags" placeholder="Tags seperated by ','" onChange={(e)=>{
                            setTags(e.target.value);
                        }} />
<br/>

                        <Button sx={{
                     margin:"2% 37%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }} variant="contained" size="large" onClick={handleSubmit}>Submit
                        </Button>
        

                 </Card>
            </Box>
        
        
        </>
    )
}