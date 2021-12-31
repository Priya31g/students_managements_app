import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Redirect} from "react-router-dom";


export const AddStudents =()=>{
    const [name,setName] = useState("");
    const [age,setage] = useState("");
    const [city,setcity] = useState("");
    const [education,seteducation] = useState("");
    const [contact,setcontact] = useState("");
    const [gender,setgender] = useState("Female");
   const token = JSON.parse(localStorage.getItem("b_token"))
    const handleSubmit =async ()=>{
        if(name===""||city===""||age===""||gender===""||education===""||contact===""){
        alert("Fill all data Correctly")
    }else{
        console.log(typeof(contact))
        let body_p = {
            name:name,
            city:city,
            age:age,
            gender:gender,
            education:education,
            contact:contact
        }
         console.log(body_p);
         try{

           
            fetch("http://localhost:2020/students",{
                method: "POST",
               body: JSON.stringify(body_p),
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json",
                    'Authorization':`Bearer ${token}`
                    
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
          label="Student's Name" placeholder="Student's Name" onChange={(e)=>{
                            setName(e.target.value);
                        }} />

                        <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Student's Age" placeholder="Student's Age" onChange={(e)=>{
                            setage(e.target.value);
                        }} />

<br/>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={gender}
          onChange={(e)=>{
           
            setgender(e.target.value);}}
          autoWidth
          label="Gender"
          sx={{
                     margin:"2% 15%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
        >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>

                      
                            <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Student's Education" placeholder="Student's Education" onChange={(e)=>{
                            seteducation(e.target.value);
                        }} />
                            <br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Student's Contact" placeholder="Student's Contact" onChange={(e)=>{
                            setcontact(e.target.value);
                        }} />

<br/>
                        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Student's City" placeholder="Student's City" onChange={(e)=>{
                            setcity(e.target.value);
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