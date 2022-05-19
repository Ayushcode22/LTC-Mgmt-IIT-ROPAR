import React, {useState } from 'react'
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification}from "firebase/auth";
import {auth} from "../firebase-config";
import { useNavigate} from "react-router-dom"
import "./LoginBox.css"

const RegisterBox=()=>{

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [cnfpassword,setcnfpassword]=useState("");
    const navigate = useNavigate();
    const reg=async()=>{
        if(email==="" && password===""&&cnfpassword===""){
            alert("Enter email and pass")
        }
        else if(password===cnfpassword && password!==""){
            try {
                const user = await createUserWithEmailAndPassword(auth,email,password)
                .then(() => {
                    sendEmailVerification(getAuth().currentUser)
                    .then(() => {
                        console.log("Email verification link send")
                    })
                    .catch((error) => {
                        console.log("Error: In verification link:", error.code, error.message)
                    });
                    //console.log("Email added")
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + " -- " + errorMessage)
                  });
                navigate("/");
                //console.log(user)
            } catch (error) {
                alert(error.message)
            }           
        }
        else{
            alert("Password does not match")
        }
    }

    const showPass = ()=>{
        var x = document.getElementById("myInput1");
        var y = document.getElementById("myInput2")
        if (x.type === "password"&&y.type==="password") {
            x.type = "text";
            y.type = "text";
        } 
        else {
            x.type = "password";
            y.type = "password";
        }
    }
return(
    <>
    <div className="container1">
        <div className="box1">
            <div className="heading1">
                Create new Account
            </div>
            <form >
                <input className="uname" placeholder="Email" type="email" onChange={(e)=>{setemail(e.target.value)}}/>
                <br />
                <input className="pass" type="password" id ="myInput1" maxLength={16} minLength={6} placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}></input>
                <br />
                <input className="pass" type="password" id ="myInput2" maxLength={16} minLength={6} placeholder='Confirm Password' onChange={(e)=>{setcnfpassword(e.target.value)}}></input>
                <br />
                <label className='showP'><input  type="checkbox" onClick={showPass} />Show Password </label>
                <br />
                <input className="button"type="button" onClick={reg} value="register"/>
            </form>
        </div>
    </div>
    </>
);
};

export default RegisterBox