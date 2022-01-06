import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Contest.css";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';



function Contest(){
    const  [page,setpage] = useState(1);
    const [size,setSize] = useState(1);
    const  [data,setData] = useState([]);
    const filteredData =async (t)=>{
      //  settype(e.target.value);
       // console.log(t)
        let {data} = await axios.get(`http://localhost:2020/contest/sort_type?page=${page}&type=${t}`);
            // console.log(data)
             setData(data);
 
    }
    const sortedDataSet=async ()=>{
        let {data} = await axios.get(`http://localhost:2020/contest/sort_deadline`);
        //console.log(data)
        setData(data);
    }
    const getData =async (url)=>{
        let {data} = await axios.get(url);

        console.log(data);
        
            setData(data);

    }
    useEffect(()=>{
        getData(`http://localhost:2020/contest?page=${page}`);
    },[page])
    return(
        <>
       <div className="h1">

            
        <select style={{margin:"0% 3%"}} 
        onChange={(e) => { filteredData(e.target.value);}}>
          <option  value="DSA">DSA</option>
          <option value="Coding">Coding</option>
          
        </select>
        <InputLabel style={{margin:"0% 3%",color:"White",fontSize:"16px"}}  id="demo-simple-select-helper-label">Type</InputLabel>
        
        <InputLabel style={{margin:"0% 3%",color:"White",fontSize:"16px",cursor:"pointer"}}  id="demo-simple-select-helper-label"
        onClick={sortedDataSet}
        >Sort By Deadline</InputLabel>
      </div>
        {data.con && data.con.map((el)=>{
            return  <CardContent key={el._id} sx={{ margin:"2% 25%",borderRadius:"10px",boxShadow:"1px 2px 2px 2px",width:"50%" }}>
                  <Typography sx={{ fontSize: 35,textAlign:"center" }} color="text.primary" gutterBottom>
                 {el.day}
                </Typography>
                <div style={{justifyContent:"space-evenly",display:"flex"}}>
                <Typography sx={{ fontSize: 22,textAlign:"center" }} color="text.primary" gutterBottom>
                         {el.title}
                    </Typography>
                    <Typography sx={{ fontSize: 18,textAlign:"center"}} color="text.primary" gutterBottom>
                         Type : {el.type}
                         
                    </Typography>
                </div>
               
                <div style={{justifyContent:"space-evenly",display:"flex"}}>
                <Typography sx={{ fontSize: 18,textAlign:"center"}} color="text.primary" gutterBottom>
                         Start Time : {el.time}
                         
                    </Typography>
                    <Typography sx={{ fontSize: 16,textAlign:"center"}} color="text.primary" gutterBottom>
                         DeadLine : {el.deadline}
                         
                    </Typography>
                </div>
                <div style={{justifyContent:"space-evenly",display:"flex"}}>
                        {el.tags.map((e,i)=>{
                           return <div key={i} style={{backgroundColor:"#84DFFF",color:"#150050",borderRadius:"5px",padding:"4px"}}>
                                {e}
                            </div>
                        })}
                </div>

              </CardContent>
        })}
        <div style={{justifyContent:"space-evenly",display:"flex"}}>
        
            <Button variant="outlined" color="secondary" disabled={page===1} onClick={()=>{
                setpage(page-1);
            }}>
                Prev
            </Button>
            <Button variant="contained" color="success" disabled={page===data.total_pages} onClick={()=>{
                setpage(page+1);
            }}>
        Next
      </Button>
        </div>
        </>
       
    
    
    )
}

export default Contest;