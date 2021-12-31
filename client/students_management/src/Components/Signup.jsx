
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Signup = ()=>{
    const [email,setEmail] = useState("");
    const history = useHistory();
    const handleSignin=async ()=>{
            try{
                if(email===""){
                    alert(`Email is required`);
                }else{
                    let b ={
                        email : email
                     }
                    fetch("http://localhost:2020/signup",{
                        method: "POST",
                       body: JSON.stringify(b),
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json",
                            
                            
                        }
                    }).then(response => response.json())
                    .then(json => {console.log(json);
                        alert(`Successfully signed Up! 
                            Please Sign In with Same Email to continue.`);
                        history.push("/signIn")
                        ;})                         
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
                 Sign Up
            </Typography>


            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 15%" }} />

            <Button variant="outlined" onClick={()=>{handleSignin()}} sx={{ textAlign:"center",margin:"4% 26%" }}>Sign Up</Button>
            </Card>
        
        </>
    )
}