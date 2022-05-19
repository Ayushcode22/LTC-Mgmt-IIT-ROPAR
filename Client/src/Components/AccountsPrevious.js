import React, { useState,useEffect } from 'react';
import styles from './mytable.module.css';
import { auth } from '../firebase-config';
import {useNavigate } from "react-router-dom";
import {FaSearch} from "react-icons/fa";


export default function AccountsPrevious() {
    const [data3,setdata3]=useState([]);
    const [user_t,set_user]=useState("")
    useEffect(() => {
      const func = async ()=>{
        const response3 = await fetch("https://ltc-mgmt.herokuapp.com/getusertype/"+auth.currentUser.uid)
        const data = await response3.json()
        set_user(data) 
  
        if(data ==="jr_acc"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_jr_acc/")
        setdata3( await response2.json())
        }
        else if(data ==="jr_acc_officer"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_jr_acc_officer/")
          setdata3( await response2.json())
        }
  
        else if(data ==="acc_asst_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_acc_asst_registrar/")
          setdata3( await response2.json())
        }
        else if(data ==="acc_deputy_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_acc_deputy_registrar/")
          setdata3( await response2.json())
        }
  
      }
      func()
    }, []);
  
    const navigate =useNavigate();
    
    const viewApp = async(event)=>{
      let rowId = event.target.getAttribute('data-arg');
      const reqId = tb[rowId].requestid
      const flag1=1;
      const check= await fetch("https://ltc-mgmt.herokuapp.com/check_acc/" +reqId)
      const d=await check.json()
      

      if(user_t==="jr_acc"){
        if(d==="Approved")
        {
            navigate("/viewForm4/"+reqId+"/"+auth.currentUser.uid+"/"+flag1)
        }
        else
        {
            navigate("/Form3/"+reqId+"/"+auth.currentUser.uid+"/"+flag1)
        }
      }
      else{
        navigate("/viewForm4/"+reqId+"/"+auth.currentUser.uid+"/"+flag1);
      }

      
      
      
    }  
  
    const[verdict,setVerdict]=useState([])
    const [flag,setflag]=useState(0);
    const[comment,setComment]=useState();
    const[emp,setemp]=useState();
    const[emp_flag,set_emp_flag]=useState(0);

    const viewVerdict=async(event)=>{
      let rowId = event.target.getAttribute('data-arg');
      
      const reqId = tb[rowId].requestid
  
      const response = await fetch("https://ltc-mgmt.herokuapp.com/get_verdict/"+reqId);
      setVerdict(await response.json())
      const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_comments/"+reqId);
      setComment(await response1.json())
      setflag(1);
    }
  
    const back_btn = () => {
      setflag(0)
    }
    const[flag_proof,setflag_proof]=useState(0);
    const handleClick = async(event) => {
      let rowId = event.target.getAttribute('data-arg');
      const reqId = tb[rowId].requestid
      const l=await fetch("https://ltc-mgmt.herokuapp.com/get_link/" + reqId)
      const link =await l.json()
      if(link == null){
        if(flag_proof==0){
            setflag_proof(1)
          }
        
        else{
          setflag_proof(0)
        }
      }
      else{
        window.open(link);
      }
    };
      let tb = [...data3]
      const[table_data,set_table_data]=useState([]);
      const search_empCode=async()=>{
        set_emp_flag(1);
        if(user_t==='jr_acc'){
          const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_prev_emp_applications_jr_acc/"+emp)
          const data1 = await response1.json();
          set_table_data(data1)
        }
        else if(user_t ==="jr_acc_officer"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_prev_emp_applications_jr_acc_officer/"+emp)
          set_table_data( await response2.json())
        }
    
        else if(user_t ==="acc_asst_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_prev_emp_applications_acc_asst_registrar/"+emp)
          set_table_data( await response2.json())
        }
  
        else if(user_t ==="acc_deputy_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_prev_emp_applications_acc_deputy_registrar/"+emp)
          set_table_data( await response2.json())
        }
        
      }

      const search_empCode_all=async()=>{
        set_emp_flag(1);
        if(user_t ==="jr_acc"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_jr_acc/")
          set_table_data( await response2.json())
        }
        else if(user_t ==="jr_acc_officer"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_jr_acc_officer/")
          set_table_data( await response2.json())
        }
  
        else if(user_t ==="acc_asst_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_acc_asst_registrar/")
          set_table_data( await response2.json())
        }
        else if(user_t ==="acc_deputy_registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious_acc_deputy_registrar/")
          set_table_data( await response2.json())
        }
        }
        
      


    return (
      <>
      <div style={{width: "94%",margin:"auto"}}>
      {flag==0?
    
    <>
    <div className={styles.search_container}>
      <input type="text" placeholder="Search With EmpCode.." value={emp} onChange={(e)=>{setemp(e.target.value)}} style={{height:"30px"}} />
      <FaSearch onClick={search_empCode} size={25} style= {{marginLeft:"10px"}}/>
      <button style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none",marginLeft:"15px"}} onClick={search_empCode_all}>Show all</button>
    </div>
    
    {emp_flag==0?
    <>
    <table className={styles.contents}>
      <tr>
        <th>Request Id</th>
        <th>Employee code</th>
        <th>Date</th>
        <th>View Application</th>
        <th>Comments</th>
        <th>Proof</th>
        </tr>
        {tb.map((element, index) => (
          <tr data-index={index}>
          <td>{element.requestid}</td>
          <td>{element.empcode}</td>
          <td>{element.day_date_submitted}</td>
          <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
          <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={viewVerdict} data-arg={index}>Verdict</button></td>
          <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={handleClick} data-arg={index}>Proof</button>{flag_proof==1?<><p style={"color:red"}>No proof Submitted</p></>:<></>}</td>
          </tr>
      ))}
    </table>
    </>:<>
    <table className={styles.contents}>
      <tr>
        <th>Request Id</th>
        <th>Employee code</th>
        <th>Date</th>
        <th>View Application</th>
        <th>Comments</th>
        </tr>
        {table_data.map((element, index) => (
          <tr data-index={index}>
          <td>{element.requestid}</td>
          <td>{element.empcode}</td>
          <td>{element.day_date_submitted}</td>
          <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
          <td><button onClick={viewVerdict} data-arg={index}>Verdict</button></td>
          <td><button onClick={handleClick} data-arg={index}>Proof</button>{flag_proof==1?<><p style={"color:red"}>No proof Submitted</p></>:<></>}</td>
          </tr>
      ))}
    </table>
    </>}
      
    </>
    :<>
    <button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={back_btn} >Back</button>
      <table className={styles.contents}>
          <tbody>
            <tr>
            <th>HOD</th>
            <td>{verdict[0].hod}</td>
            <td>{comment[0].hod_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Junior Assistant</th>
            <td>{verdict[0].jr_assistant}</td>
            <td>{comment[0].jr_assistant_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Junior Superintendent</th>
            <td>{verdict[0].jr_superintendent}</td>
            <td>{comment[0].jr_superintendent_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Assistant Registrar</th>
            <td>{verdict[0].asst_registrar}</td>
            <td>{comment[0].asst_registrar_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Assistant Audit Officer</th>
            <td>{verdict[0].asst_audit_officer}</td>
            <td>{comment[0].asst_audit_officer_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Audit Officer</th>
            <td>{verdict[0].audit_officer}</td>
            <td>{comment[0].audit_officer_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Senior Audit Officer</th>
            <td>{verdict[0].sr_audit_officer}</td>
            <td>{comment[0].sr_audit_officer_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Junior Accountant</th>
            <td>{verdict[0].jr_acc}</td>
            <td>{comment[0].jr_acc_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Junior Accounting Officer</th>
            <td>{verdict[0].jr_acc_officer}</td>
            <td>{comment[0].jr_acc_officer_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Assistant Registrar</th>
            <td>{verdict[0].acc_asst_registrar}</td>
            <td>{comment[0].acc_asst_registrar_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Deputy Registrar</th>
            <td>{verdict[0].deputy_registrar}</td>
            <td>{comment[0].deputy_registrar_comment}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
            <th>Registrar</th>
            <td>{verdict[0].registrar}</td>
            <td>{comment[0].registrar_comment}</td>
            </tr>
          </tbody><tbody>
            <tr>
            <th>Dean</th>
            <td>{verdict[0].dean}</td>
            <td>{comment[0].dean_comment}</td>
            </tr>
          </tbody>

        </table>
    </>
          
        }
      </div>
      </>
  
    )
}
