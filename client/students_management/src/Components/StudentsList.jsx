import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Redirect} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

 const Students = ()=>{
   
    const [filter_q,setFilter_q] = useState("");
    const [filter_v,setFilter_v] = useState("");
    const [s_data,setData] = useState([]);
    const [page,setPage] = useState(1)
    const [loading ,setLoading] = useState(false);

      const handleDelete = async (id)=>{
          try{
              let data = await axios.delete(`http://localhost:2020/students/${id}`);

             // console.log(data);
              alert(`Successfully Deleted`);
              getData(`http://localhost:2020/students?page=${page}`)
          }catch(err){
              console.log(err)
          }

      }

     const token = (localStorage.getItem("b_token"));

    const findData = async () =>{
      console.log(filter_q,filter_v);
     
      try{
        if(filter_q==="Age"){
           
            let data = await axios.get(`http://localhost:2020/students/filter_age?age=${filter_v}`,{
              header:{
                Authorization:`Bearer ${JSON.parse(token)}`
              }
             
            });
            

           // console.log(data.data);
            setData(await data.data);
            // let d = s_data.filter((el)=>{
            //   return (el.age===filter_v)
            // })
            // console.log(d);
        }else{
         
          let data = await axios.get(`http://localhost:2020/students/filter_name?name=${filter_v}`,{
              header:{
                Authorization:`Bearer ${JSON.parse(token)}`
              }
             
            });
            //let x =data;
           // console.log(data.data);
            setData(data.data);
           // console.log(s_data)
          
        }
      }catch(err){
        
          //console.log(err);
      }finally{
        //console.log(s_data);
        
      }
    }


    const getData =async ()=>{
    
      try{
        if((token)===undefined||(token)===null){
          alert(`Needs to sign up first`);
          return;
        }
       
       
        let {data} = await axios.get(`http://localhost:2020/students?page=${page}`,{
          header:{
            Authorization:`Bearer ${JSON.parse(token)}`
          }
         
        });
      
        // console.log(data);
          setData(data);
          //setLoading(false);
          
          //  console.log(s_data)
          
        

      }catch(err){
         // console.log("err",err);
         // setLoading(false);
          alert(`something went wrong`);
      }
     
    }
 
    useEffect( ()=>{
      console.log("refreshing")
     
      getData();
     
    },[page])
   
    if((token)===undefined||(token)===null){

     
      return  <>
      <h2>Needs To Sign Up First</h2>
        <Redirect to="/signup" /> 
      </>
  }

    return (
        <>
        {loading?<h3>Loading ...</h3>: <List sx={{ width: '80%',  bgcolor: '#D6E5FA',margin:"2% 10%",padding:"5%",boxShadow:"1px 1px 1px 1px" }}>

          <ListItem alignItems="flex-start" >
          <Typography
                          sx={{fontSize:"25px"}}
                            component="h2"
                            variant="body2"
                            minWidth="110px"
                            color="text.primary"
                          >
                            Filter By :
                          </Typography>
            <Select
          value={filter_q}
          onChange={(e)=>{
           
            setFilter_q(e.target.value);}}
          autoWidth
          label="Query"
          placeholder="Query"
          sx={{       minWidth:"200px",
                     margin:"0% 5%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
        >
          <MenuItem  sx={{       minWidth:"175px",
                    
                     alignSelf:"center"
                   
                  }} value="name">Name</MenuItem>
          <MenuItem  sx={{       minWidth:"200px",
                    
                     alignSelf:"center"
                   
                  }} value="Age">Age</MenuItem>
        </Select>
        <TextField sx={{width:"85%",
                     margin:"2% 10%",
                     padding:"15px",
                     alignSelf:"center"
                   
                  }}
          required
          id="outlined-required"
          label="Value" placeholder="Value" onChange={(e)=>{
                            setFilter_v(e.target.value)
                        }} />

          <Button onClick={()=>{findData()}}>Find</Button>
          </ListItem>
      
               {s_data.students && s_data.students.map((el)=>{
                      return   <ListItem alignItems="flex-start" key={el._id}>
        
                         <ListItemText
                         
                           primary={
                            <Typography
                          sx={{fontSize:"25px"}}
                            component="h2"
                            variant="body2"
                            color="text.primary"
                          >
                             {el.name}
                          </Typography>
                           }
                           secondary={
                             
                               <Typography
                                 sx={{ display: 'inline',fontSize:"16px" }}
                                 component="span"
                                 variant="body2"
                                 color="text.primary"
                               >
                                 Age : {el.age} <br/>
                                  City    :{el.city}<br/>
                                 Gender :{el.gender} <br/>
                                  Education : {el.education} <br/>

                                 Contact : {el.contact}<br/>
                                  <hr/>
                               </Typography>

                                
                                
                             
                           }
                           
                         />
                          <IconButton aria-label="delete" onClick={()=>{
                            handleDelete(el._id)
                          }}>
                           <DeleteIcon />
                          </IconButton>
                      </ListItem>
                    
               })} 
         <div style={{justifyContent:"space-evenly",display:"flex"}}>
        
        <Button variant="outlined" color="secondary" disabled={page===1} onClick={()=>{
            setPage(page-1);
        }}>
            Prev
        </Button>
        <Button variant="contained" color="success" disabled={page===s_data.total_pages} onClick={()=>{
            setPage(page+1);
        }}>
    Next
  </Button>
    </div>
     
    </List>
        

        }
           
        </>
    ) 

}

export {Students};