import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import{getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import {auth} from "../firebase-config"
import './LoginBox.css';
//import {toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//toast.configure()

const LoginBox = () => {


    const [AlertText,setAlertText]=useState("");

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const navigate = useNavigate();
    const logUser=async()=>{

        await signInWithEmailAndPassword(auth,email,password)
        .then(async() => {
            console.log(auth.currentUser);
            if (getAuth().currentUser.emailVerified) {

                
                const response = await fetch("https://ltc-mgmt.herokuapp.com/getrole/"+email)
                const  data =await response.json()
                console.log(data)
                if(data ==="admin"){
                    navigate("/adminpage/"+auth.currentUser.uid);
                }
                else if(data ==="user"){
                    navigate("/userpage/"+auth.currentUser.uid+"/home")
                }
                else if(data === "establishment"){
                    navigate("/estabpage/"+auth.currentUser.uid)
                }
                else if(data === "superintendent"){
                    navigate("/estabpage/"+auth.currentUser.uid)
                }
                else if(data === "registrar"){
                    navigate("/estabpage/"+auth.currentUser.uid)
                }
                else if(data ==="asstauditofficer"){
                    navigate("/auditpage/"+auth.currentUser.uid)
                }
                else if(data ==="audit_officer"){
                    navigate("/auditpage/"+auth.currentUser.uid)
                }
                else if(data ==="senior"){
                    navigate("/auditpage/"+auth.currentUser.uid)
                }
                else if(data ==="dean" ){
                    navigate("/deanpage/"+auth.currentUser.uid)
                }
                else if(data ==="jr_acc" || data ==="jr_acc_officer" || data ==="acc_asst_registrar" || data ==="acc_deputy_registrar"){
                    navigate("/accountspage/"+auth.currentUser.uid)
                }
                else if(data ==="main_registrar" ){
                    navigate("/registrarpage/"+auth.currentUser.uid)
                }


                console.log("Email verified send to next page")
            }
            else {
                sendEmailVerification(getAuth().currentUser)
                .then(() => {
                    setAlertText("Email not verified.Verification link send");
                    console.log("Email verification link send")
                })
                .catch((error) => {
                    console.log("Error: In verification link:", error.code, error.message)
                });
                alert("Email not verified send new snkjhdjvxh")
            }
           

        })
        .catch((error) => {
            if(error.message==="Firebase: Error (auth/invalid-email)."){
                setAlertText("Invalid Email")
            }
            else if(error.message==="Firebase: Error (auth/wrong-password)."){
                setAlertText("Wrong Password")
            }
            else if(error.message==="Firebase: Error (auth/user-not-found)."){
                setAlertText("User not found")
            }
            else if(error.message==="Firebase: Error (auth/internal-error)."){
                setAlertText("Internal Error")
            }
            else{
                setAlertText(error.message);
            }
            
            
            // alert(error.message)
        });
    }

    const showPass = ()=>{
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } 
        else {
            x.type = "password";
        }
    }


    return (
        <>
        <div className="container1" id ="at">
            <div className="box1">
                <div className="heading1">
                    Login
                </div>
                <form> 
                    <input className="uname" placeholder="Email" type="email"  onChange={(e)=>{setemail(e.target.value)}}/>
                    <br />
                    <input className="pass" type="password" id ="myInput" placeholder='Password'maxLength={16} minLength={6}  onChange={(e)=>{setpassword(e.target.value)}}></input>
                    <br />
                    <label className='showP'><input  type="checkbox" onClick={showPass} />Show Password </label>
                    <br />
                    
                </form>
                <div className='buttondiv'>
                        <button className="button" type='submit'  onClick={logUser}>Login</button>
                </div>

                {(AlertText!=="")
                ?<div className='wrongtext'>
                    <p>{AlertText}</p>
                </div>:null}
                


                <div className='fpassdiv'>
                <Link className='fpass' to="/forgotpassword">forgot password?</Link> 
                </div>
                <div className='reglinkdiv'>
                <Link className='reglink'to="/register" >Create new account</Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginBox;