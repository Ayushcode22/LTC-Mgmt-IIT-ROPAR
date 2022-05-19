import React from "react";
import TextField from '@mui/material/TextField';
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import styles from './EstForm1.module.css';
import { auth } from "../firebase-config";

function EstForm1(){
    const{ecode,uid,reqid}=useParams()
    useEffect(() => {
        const autofill =async()=>{
            
            const response1= await fetch("https://ltc-mgmt.herokuapp.com/get_joining_date/"+ecode)
            const {joining_date} =await response1.json()
            const response = await fetch("https://ltc-mgmt.herokuapp.com/last_ltc/" +ecode)
            const d= await response.json()
            if(d.length!=0)
            {
                var date1=new Date(d[0].per_from_current)
                date1.setDate(date1.getDate()+1)
                var d1=date1.toISOString().substr(0,10)

                var date2=new Date(d[0].per_to_current)
                date2.setDate(date2.getDate()+1)
                var d2=date2.toISOString().substr(0,10)

                var date3=new Date(d[0].ltc_sf_current)
                date3.setDate(date3.getDate()+1)
                var d3=date3.toISOString().substr(0,10)

                var date4=new Date(d[0].sac_per_from_current)
                date4.setDate(date4.getDate()+1)
                var d4=date4.toISOString().substr(0,10)

                var date5=new Date(d[0].sac_per_to_current)
                date5.setDate(date5.getDate()+1)
                var d5=date5.toISOString().substr(0,10)

                let d6=joining_date.substr(0,10);
                setEST({...EST,["nature_ltc_last"]:d[0].nature_ltc_current,["per_from_last"]:d1,["per_to_last"]:d2,["ltc_sf_last"]:d3,["encash_last"]:d[0].encash_current,["credit_last"]:d[0].credit_current,["balance_last"]:d[0].balance_current,["admiss_last"]:d[0].admiss_current,
        ["sac_per_from_last"]:d4,["sac_per_to_last"]:d5,["sac_nature_last"]:d[0].sac_nature_current,["joining"]:d6})
            
        }
             }
        autofill()

        
      }, []);
    const navigate = useNavigate();
    const [EST,setEST]=useState({
        
        joining: null,
        block_year: "",
        nature_ltc_last: "",
        nature_ltc_current: "",
        per_from_last:null,
        per_to_last:null,
        per_from_current:null,
        per_to_current:null,
        ltc_sf_last:null,
        ltc_sf_current:null,
        encash_last:"",
        encash_current:"",
        credit:null,
        credit_last:"",
        credit_current:"",
        balance_last: "",
        balance_current: "",
        admiss_last: "",
        admiss_current: "",
        sac_per_from_last:null,
        sac_per_to_last:null,
        sac_nature_last:"",
        sac_per_from_current:null,
        sac_per_to_current:null,
        sac_nature_current:"",
        reqid:reqid,

    })
    
    const submit_est=async()=>{
        navigate("/estabpage/"+auth.currentUser.uid+"/new")
        const response = await fetch("https://ltc-mgmt.herokuapp.com/establishment_update",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(EST)
            });
    }
    const inputEventest=async(e)=>{
        setEST({...EST,[e.target.name]:e.target.value});
    }
    const [data,setdata]=useState([])

    return(
        <div className={styles.est_main}>
            <p style={{fontWeight:"bold",fontSize: "20px",textDecoration: "underline"}}>FOR USE OF ESTABLISHMENT SECTION</p>
            <p style={{alignSelf: "flex-start"}}>Fresh Recruit i.e. joining Govt. Service after 01.09.2008 /otherwise, Date of joining: &nbsp;&nbsp;
                <TextField
                    id="date"
                    type="date"
                    size='small'
                    variant="standard"
                    sx={{ width: 150 }}
                    name='joining' value={EST.joining} onChange={inputEventest}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                &nbsp;&nbsp;Block year: &nbsp;&nbsp;<TextField id="outlined-basic" size='small' variant="standard" sx={{ width: 80 }} name='block_year' value={EST.block_year} onChange={inputEventest}/> </p>
            <table className={styles.est} style={{width:"100%"}}>
                <tr>
                    <th className={styles.est} style={{width:"4%"}}>S No.</th>
                    <th className={styles.est} style={{width:"46%"}}>Particulars</th>
                    <th className={styles.est} style={{width:"25%"}}>Last Availed</th>
                    <th className={styles.est} style={{width:"25%"}}>Current LTC</th>
                </tr>
                <tr>
                    <td className={styles.est} >1.</td>
                    <td className={styles.est} >Nature of LTC (Home Town/Anywhere in India-place visited/to be visited)</td>
                    <td className={styles.est} ><TextField id="outlined-basic" size='small' variant="outlined" name='nature_ltc_last' value={EST.nature_ltc_last} onChange={inputEventest}/></td>
                    <td className={styles.est} ><TextField id="outlined-basic" size='small' variant="outlined" name='nature_ltc_current' value={EST.nature_ltc_current} onChange={inputEventest}/></td>

                </tr>
                <tr>
                    <td className={styles.est} >2.</td>
                    <td className={styles.est} > Period</td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}><TextField
                            id="date"
                            label="From"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='per_from_last' value={EST.per_from_last} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="To"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='per_to_last' value={EST.per_to_last} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /></div>
                    </td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}><TextField
                            id="date"
                            label="From"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='per_from_current' value={EST.per_from_current} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="To"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='per_to_current' value={EST.per_to_current} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /></div>
                    </td>
                </tr>
                <tr>
                    <td className={styles.est} >3.</td>
                    <td className={styles.est} >LTC for Self/Family</td>
                    <td className={styles.est} >
                        <TextField
                            id="date"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='ltc_sf_last' value={EST.ltc_sf_last} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </td>
                    <td className={styles.est} >
                        <TextField
                            id="date"
                            type="date"
                            size='small'
                            sx={{ width: 222 }}
                            name='ltc_sf_current' value={EST.ltc_sf_current} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className={styles.est} >4.</td>
                    <td className={styles.est} >Earned leave encashment</td>
                    <td className={styles.est} ><TextField id="outlined-basic" size='small' label="No. of Days" variant="outlined" name='encash_last' value={EST.encash_last} onChange={inputEventest}/></td>
                    <td className={styles.est} ><TextField id="outlined-basic" size='small' label="No. of Days" variant="outlined" name='encash_current' value={EST.encash_current} onChange={inputEventest}/></td>
                </tr>
                <tr>
                    <td className={styles.est} >5.</td>
                    <td className={styles.est} ><p style={{marginTop: "0"}}>Earned leave standing to his credit on &nbsp;<TextField
                            id="date"
                            type="date"
                            size='small'
                            variant="standard"
                            sx={{ width: 148 }}
                            name='credit' value={EST.credit} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /></p>
                        <p style={{marginTop: "28px"}}>Balance Earned leave after this encashment</p>
                        <p style={{marginTop: "32px",marginBottom: "0"}}>Earned leave encahsment admissible</p>
                    </td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='credit_last' value={EST.credit_last} onChange={inputEventest}/>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='balance_last' value={EST.balance_last} onChange={inputEventest}/>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='admiss_last' value={EST.admiss_last} onChange={inputEventest}/>
                        </div>
                    </td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='credit_current' value={EST.credit_current} onChange={inputEventest}/>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='balance_current' value={EST.balance_current} onChange={inputEventest}/>
                            <TextField id="outlined-basic" size='small' variant="outlined" sx={{ width: 222 }} name='admiss_current' value={EST.admiss_current} onChange={inputEventest}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className={styles.est} >6.</td>
                    <td className={styles.est} >Period and nature of leave applied for and need to be sanctioned</td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}><TextField
                            id="date"
                            type="date"
                            size='small'
                            label = "From"
                            sx={{ width: 222 }}
                            name='sac_per_from_last' value={EST.sac_per_from_last} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            type="date"
                            size='small'
                            label = "To"
                            sx={{ width: 222 }}
                            name='sac_per_to_last' value={EST.sac_per_to_last} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField id="outlined-basic" size='small' variant="outlined" label = "Nature" sx={{ width: 222 }} name='sac_nature_last' value={EST.sac_nature_last} onChange={inputEventest}/></div>
                    </td>
                    <td className={styles.est} >
                        <div style={{display: "flex",flexDirection:"column",rowGap:"10px"}}><TextField
                            id="date"
                            type="date"
                            size='small'
                            label = "From"
                            sx={{ width: 222 }}
                            name='sac_per_from_current' value={EST.sac_per_from_current} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            type="date"
                            size='small'
                            label = "To"
                            sx={{ width: 222 }}
                            name='sac_per_to_current' value={EST.sac_per_to_current} onChange={inputEventest}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField id="outlined-basic" size='small' variant="outlined" label = "Nature" sx={{ width: 222 }}  name='sac_nature_current' value={EST.sac_nature_current} onChange={inputEventest}/></div>
                    </td>
                </tr>
            </table>
            <p style={{alignSelf: "flex-start"}}>May consider and approve the above LTC (Home Town/Anywhere in India), Leave and Encashment of Leave.</p>
            <hr style={{width: "100%",border: "0.1px solid black",marginTop:"20px"}}/>
            <p style={{display:"flex",width: "100%",justifyContent: "space-between",marginBottom:"50px"}}><span>Junior Assistant</span> <span>Junior Superintendent</span> <span>Assistant Registrar</span> <span>Deputy Registrar</span> </p>
            <button type="button" className={styles.est_sub} class="btn btn-primary" onClick={submit_est}>Submit</button>
        </div>
    )
}
export default EstForm1