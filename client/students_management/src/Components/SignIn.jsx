
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
if(localStorage.getItem("b_token")==null){
    localStorage.setItem("b_token","");
}
export const SignIn = ()=>{
    const [email,setEmail] = useState("");
    const handleSignin=async ()=>{
            try{
                if(email===""){
                    alert(`Email is required`);
                }else{
                    let b ={
                        email : email
                     }
                    fetch("http://localhost:2020/signin",{
                        method: "POST",
                       body: JSON.stringify(b),
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json",
                            
                            
                        }
                    }).then(response => response.json())
                    .then(json => {console.log(json);
                        alert(`Successfully signed In`);
                        localStorage.setItem("b_token",JSON.stringify(json.token));})                         
                    .catch((err)=>{
                        alert(`Ooops! Something Went Wrong!😑
                           `)
                    })  

                    console.log(email)
                    /**headers: {
                        "Content-type": "application/json"
                    } */
                }
                  
            }catch(err){
                console.log(err);
            }
    }

    return (
        <>
            <Card sx={{ maxWidth: 275,margin:"4% 35%" }}>
            <Typography sx={{ fontSize: 25,textAlign:"center", }} color="tomato" gutterBottom>
                 Sign In
            </Typography>


            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 15%" }} />

            <Button variant="outlined" onClick={()=>{handleSignin()}} sx={{ textAlign:"center",margin:"4% 26%" }}>Sign In</Button>
            </Card>
        
        </>
    )
}