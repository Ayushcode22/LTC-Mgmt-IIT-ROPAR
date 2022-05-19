import React from "react";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './Form_4.module.css';
import { style } from "@mui/system";
import { makeStyles } from "@mui/material";

export default function Acc_section(){
    
    const{reqid,uid}=useParams();
    const navigate =useNavigate()

    const inputEventacc=async(e)=>{
        if (e.target.id==='t-int')
        {
            console.log(e.target.id,e.target.name,e.target.value)
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setACC({...ACC,[e.target.name]:e.target.value,["rows"]:array});
                // setACC({...ACC,["rows"]:array});
            }
        }
        else
        {
            setACC({...ACC,[e.target.name]:e.target.value,["rows"]:array});
            // setACC({...ACC,["rows"]:array});
        }
        
    }

    const inputEventrow1=async(e)=>{
        if (e.target.id==='t-int')
        {
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setrow1({...row1,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
            }
        }
        else
        {
            setrow1({...row1,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }

        console.log(row1)
    }
    const inputEventrow2=async(e)=>{
        if (e.target.id==='t-int')
        {
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setrow2({...row2,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
            }
        }
        else
        {
            setrow2({...row2,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }

    }
    const inputEventrow3=async(e)=>{
        if (e.target.id==='t-int')
        {
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setrow3({...row3,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
            }
        }
        else
        {
            setrow3({...row3,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }
        
    }
    const inputEventrow4=async(e)=>{
        if (e.target.id==='t-int')
        {
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setrow4({...row4,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
            }
        }
        else
        {
            setrow4({...row4,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }
    }
    const inputEventrow5=async(e)=>{
        if (e.target.id==='t-int'){
        const num=Number(e.target.value)
        if(Number.isInteger(num) )
        {
            setrow5({...row5,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }
        else
        {
            setrow5({...row5,[e.target.name]:e.target.value});
            setACC({...ACC,["rows"]:array});
        }
        }
    }
    const inputEventrow6=async(e)=>{
        if (e.target.id==='t-int'){
        const num=Number(e.target.value)
        if(Number.isInteger(num) )
        {
            setrow6({...row6,[e.target.name]:e.target.value});
        setACC({...ACC,["rows"]:array});
        }
        }
        else
        {
            setrow6({...row6,[e.target.name]:e.target.value});
            setACC({...ACC,["rows"]:array});
        }
    }

    const [row1,setrow1]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const [row2,setrow2]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const [row3,setrow3]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const [row4,setrow4]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const [row5,setrow5]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const [row6,setrow6]=useState({
        from : "", to: "",mode : "",fares : "",single_fare : "",amount : ""
    })
    const array=[row1,row2,row3,row4,row5,row6];
    

    const [ACC,setACC]=useState({
        rows:array,
        total: 0,
        advanced :0,
        passed: 0,
        words: "",
        debit: "",
        reqid:reqid
    })

    const submit=async()=>{
        navigate("/accountspage/"+uid+"/new")
        const response = await fetch("https://ltc-mgmt.herokuapp.com/insert_acc/",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(ACC)
            });

    }


    return(
        <div className={styles.acc_main}>
            <p style={{fontWeight:"bold",fontSize: "20px",textDecoration: "underline",marginBottom:"30px"}}>FOR USE BY THE ACCOUNTS SECTION</p>
            <table className={styles.acc}>
                <tr>
                    <th className={styles.acc} >From</th>
                    <th className={styles.acc} >To</th>
                    <th className={styles.acc} >Mode Of Travel</th>
                    <th className={styles.acc} >No. of Fares</th>
                    <th className={styles.acc} >Single Fare</th>
                    <th className={styles.acc} >Amount</th>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row1.from} onChange={inputEventrow1}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row1.to} onChange={inputEventrow1}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row1.mode} onChange={inputEventrow1}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares'  value={row1.fares} onChange={inputEventrow1}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fare' value={row1.single_fare} onChange={inputEventrow1}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row1.amount} onChange={inputEventrow1}/></td>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row2.from} onChange={inputEventrow2}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row2.to} onChange={inputEventrow2}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row2.mode} onChange={inputEventrow2}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares' value={row2.fares} onChange={inputEventrow2}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fare' value={row2.single_fare} onChange={inputEventrow2}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row2.amount} onChange={inputEventrow2}/></td>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row3.from} onChange={inputEventrow3}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row3.to} onChange={inputEventrow3}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row3.mode} onChange={inputEventrow3}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares' value={row3.fares} onChange={inputEventrow3}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fare' value={row3.single_fare} onChange={inputEventrow3}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row3.amount} onChange={inputEventrow3}/></td>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row4.from} onChange={inputEventrow4}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row4.to} onChange={inputEventrow4}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row4.mode} onChange={inputEventrow4}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares' value={row4.fares} onChange={inputEventrow4}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fares' value={row4.single_fare} onChange={inputEventrow4}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row4.amount} onChange={inputEventrow4}/></td>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row5.from} onChange={inputEventrow5}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row5.to} onChange={inputEventrow5}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row5.mode} onChange={inputEventrow5}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares' value={row5.fares} onChange={inputEventrow5}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fares' value={row5.single_fare} onChange={inputEventrow5}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row5.amount} onChange={inputEventrow5}/></td>
                </tr>
                <tr>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='from' value={row6.from} onChange={inputEventrow6}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='to' value={row6.to} onChange={inputEventrow6}/></td>
                    <td className={styles.acc} ><TextField id="outlined-basic" size='small' variant="outlined" name='mode' value={row6.mode} onChange={inputEventrow6}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='fares' value={row6.fares} onChange={inputEventrow6}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='single_fares' value={row6.single_fare} onChange={inputEventrow6}/></td>
                    <td className={styles.acc} ><TextField id="t-int" size='small' variant="outlined" name='amount' value={row6.amount} onChange={inputEventrow6}/></td>
                </tr>
            </table>
            <TextField id="t-int" size='small' variant="standard" label= "Total ₹" name='total' value={ACC.total} onChange={inputEventacc} style={{alignSelf:"flex-end",marginBottom:"10px"}}/>
            <span style={{alignSelf:"flex-start",width: "100%",marginBottom:"10px"}}><TextField id="t-int" size='small' variant="standard" label= "Advance admissible (90% of above) ₹" name='advanced' value={ACC.advanced} onChange={inputEventacc} style={{width:"48%",marginRight:"4%"}}/>
            <TextField id="t-int" size='small' variant="standard" label= "Passed for ₹" name='passed' value={ACC.passed} onChange={inputEventacc} style={{width:"48%"}}/></span>
            <TextField id="outlined-basic" size='small' variant="standard" label= "(in words); Rupees" name='words' value={ACC.words} onChange={inputEventacc} style={{alignSelf:"flex-start", width: "100%",marginBottom:"10px"}}/>
            <TextField id="outlined-basic" size='small' variant="standard" label= "Debitable to LTC advance Dr./Mr./Mrs./Ms." name='debit' value={ACC.debit} onChange={inputEventacc} style={{alignSelf:"flex-start", width: "100%"}}/>
            <p style={{display:"flex",width: "100%",justifyContent: "space-between",marginTop:"80px"}}><span>Junior Accountant</span> <span>Junior Account Officer</span> <span>Assistant Registrar</span> <span>Deputy Registrar</span> </p>
            <hr style={{width: "100%",border: "0.1px solid black"}}/>
            <p style={{display:"flex",width: "100%",justifyContent: "space-between"}}><span>Recommended & Forwarded</span> <span>Approved/Not Approved</span> </p>
            <p style={{display:"flex",width: "100%",justifyContent: "space-between", marginTop:"64px"}}><span>Registrar</span> <span>Dean (FA & A)</span> </p>
            <button type="button" className={styles.acc_sub} class="btn btn-primary" onClick={submit}>Submit</button>
        </div>
    )
}
