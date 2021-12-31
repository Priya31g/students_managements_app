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
 const Students = ()=>{
    const [s_data,setData] = useState([]);
    const [page,setPage] = useState(1)
    const [loading ,setLoading] = useState(true);

      const handleDelete = async (id)=>{
          try{
              let data = await axios.delete(`http://localhost:2020/students/${id}`);

              console.log(data);
              alert(`Successfully Deleted`);
              getData(`http://localhost:2020/students?page=${page}`)
          }catch(err){
              console.log(err)
          }

      }


    const getData =async (url)=>{
     
      try{
        let token = JSON.parse(localStorage.getItem("b_token"))
        let {data} = await axios.get(url,{
          header:{
            Authorization:`Bearer ${token}`
          }
         
        });
        console.log(data);
        setData(data);
          console.log(s_data)

      }catch(err){
          console.log("err",err)
      }finally{
        setLoading(false);
      }
        
       

    }
    useEffect(()=>{
        getData(`http://localhost:2020/students?page=${page}`);
        setPage(1);
    },[loading])


    return (
        <>
        {loading?<h3>Loading ...</h3>: <List sx={{ width: '80%',  bgcolor: '#D6E5FA',margin:"2% 10%",padding:"5%",boxShadow:"1px 1px 1px 1px" }}>
               {s_data.students.map((el)=>{
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