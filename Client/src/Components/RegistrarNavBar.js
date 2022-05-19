import React from 'react';
import { useState,useEffect } from 'react';
import {Link} from "react-router-dom"
import {auth} from "../firebase-config";
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './mynav.module.css';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const signoutfunc=()=>{
    signOut(auth).then(() => {
      window.localStorage.clear();
      window.location.href='/'
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });

  }

  const [data,setdata]=useState({
    first_name:"",
    last_name:""
  })
  const LoadName =async()=>{

    const uid=auth.currentUser.uid
    const response =await fetch("https://ltc-mgmt.herokuapp.com/name/"+uid)
    const d=await response.json()
    console.log("OKP",d)
    setdata(d)

  }
  
  useEffect (()=>{
    LoadName() 
  },[])
  return (
    <div className='container'>
    <AppBar position="static">
        <Toolbar className={styles.a1}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <AiOutlineMenu color='white'/>
          </IconButton> */}
          <Typography className={styles.a2}>
          <h2 style={{color: "white"}}>Audit Section</h2>
            <Link to={"/registrarpage/" + auth.currentUser.uid + "/previous"} className={styles.a3}>
              Previous Applications
            </Link>
            <Link to= {"/registrarpage/"+auth.currentUser.uid+"/new"} className={styles.a3}>
              New Applications
            </Link>
          </Typography>
          <Typography className={styles.a2} style={{justifyContent:"flex-end"}}>
            <h3 style={{color: "white",textAlign:"end"}}>{data.first_name + " "+data.last_name}</h3>
            <button color="inherit" onClick={signoutfunc} className={styles.signout_btn}>Sign Out</button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
