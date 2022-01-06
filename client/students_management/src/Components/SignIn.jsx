
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
if(localStorage.getItem("b_token")==null){
    localStorage.setItem("b_token","");
}
export const SignIn = ()=>{
    const history = useHistory();
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
                        if(json.token){
                        alert(`Successfully signed In`);
                        localStorage.setItem("b_token",JSON.stringify(json.token));}})                         
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
                alert(`Ooops! Something Went Wrong!😑`)
            }
    }

    return (
        <>
            <Card sx={{ minWidth: 275,margin:"4% 35%" }}>
            <Typography sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} color="#0F044C" gutterBottom>
                 Sign In
            </Typography>


            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" sx={{ fontSize: 25,textAlign:"center",margin:"4% 5%",width:"90%" }} />

            <Button variant="outlined" onClick={()=>{handleSignin()}} sx={{ textAlign:"center",margin:"4% 5%",width:"90%" }}>Sign In</Button>
            <a href="http://localhost:2020/auth/google" target="_blank" rel="noreferrer noopener">
            <Button variant="outlined"  sx={{ textAlign:"center",margin:"4% 5%",width:"90%"}}>
            <Avatar src="https://cdn-icons-png.flaticon.com/512/281/281764.png" height='25px' width='25px'/><span style={{textDecoration:"none",margin:"0% 3%" }}>Sign In</span> 
            </Button>
            </a>
            
            </Card>
        
        </>
    )
}