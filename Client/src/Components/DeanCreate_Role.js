import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { auth } from '../firebase-config';



export default function DeanCreate_Role() {
    const navigate=useNavigate()
    const [data,setdata]=useState({
        Email:"",
        Role:"",
        Designation:"",
        Department:"",
        Emp_Code:0,
        F_id:"",
        First_Name:"",
        Last_Name:"",
        Band_Pay:"",
        joindate:""
    })
    const Create_Role =async()=>{
        navigate("/deanpage/"+auth.currentUser.uid+"/new")
            const response1 = await fetch("https://ltc-mgmt.herokuapp.com/Create_Role/",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(data)
            });
        
    }
    
    
    const Update =(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
  return (
      <>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"15px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Email:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Email' value={data.Email} onChange={Update} />
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>First Name:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='First_Name'  value={data.First_Name} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Last Name:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Last_Name'  value={data.Last_Name} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Role:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Role' value={data.Role}onChange={Update} />
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Designation:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Designation' value={data.Designation} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Department:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Department' value={data.Department} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Employee Code:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Emp_Code' value={data.Emp_Code} onChange={Update} />
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Band Pay:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='Band_Pay'  value={data.Band_Pay} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Date Of Joining:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='joindate' type ='date' value={data.joindate} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",columnGap:"1.5%",margin:"2px 0 0 50px"}}>
      <p style={{fontWeight:"600",fontSize:"20px"}}>Firebase_id:</p>
      <TextField required id="outlined-basic" size='small' variant="outlined" name='F_id'  value={data.F_id} onChange={Update}/>
    </div>
    <div style={{display:"flex",alignItems:"center",margin:"50px 0 70px 50px"}}><button style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={Create_Role}>Create</button></div>

    </>
  )
}
