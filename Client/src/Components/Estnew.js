import React, { useState,useEffect } from 'react';
import styles from './mytable.module.css';
import { auth } from '../firebase-config';
import {useNavigate } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

export default function Estnew() {
  const [user_t,set_user]=useState("")
    const navigate=useNavigate()
    const [data3,setdata3]=useState([]);

    useEffect(() => {
      const func =async()=>{   
        const response3 = await fetch("https://ltc-mgmt.herokuapp.com/getusertype/"+auth.currentUser.uid)
        const data = await response3.json()
        set_user(data) 
        if(data==="superintendent"){
          console.log("YAHA TAK AAGYA")
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedjasst/")
          setdata3( await response2.json())
        }
        else if(data==="establishment"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedapp/")
          setdata3( await response2.json())
          // console.log(data3)
        }
        else if(data ==="registrar"){
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedjspr/")
          setdata3( await response2.json())
        }
        }
        func()
    }, []);
    
      console.log(data3)
    const[data,setdata]=useState()
    const[verdict,setVerdict]=useState([])
    const [flag,setflag]=useState(0);
    const[emp,setemp]=useState();
    const[emp_flag,set_emp_flag]=useState(0);

    
    const viewApp = async(event)=>{
      let rowId = event.target.getAttribute('data-arg');
      // console.log(rowId)
      const reqId = tb[rowId].requestid
      const empcode = tb[rowId].empcode
      console.log(reqId)
      const flag1=0
      if(user_t ==="superintendent" || user_t==="registrar"){
          navigate("/EstForm2/"+reqId+"/"+auth.currentUser.uid+"/"+flag1)
          
      }
      else if(user_t ==="establishment"){
        navigate("/application/"+reqId+"/"+auth.currentUser.uid+"/"+flag1+"/"+empcode);
      }
      

    }

    let tb =[...data3]
    const [comment,setComment]=useState([])
    const viewVerdict=async(event)=>{
      let rowId = event.target.getAttribute('data-arg');
      console.log(rowId,"ye hai row id")
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
    const[table_data,set_table_data]=useState([]);

    const search_empCode=async()=>{
      set_emp_flag(1);
      if(user_t==='establishment'){
        const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_new_emp_applications_jr_asst/"+emp)
        const data1 = await response1.json();
        set_table_data(data1)
      }
      else if(user_t ==="superintendent"){
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_new_emp_applications_jr_superintendent/")
        set_table_data( await response2.json())
      }
  
      else if(user_t ==="registrar"){
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_new_emp_applications_asst_reg/")
        set_table_data( await response2.json())
      }
      
    }

    const search_empCode_all=async()=>{
      set_emp_flag(1);
      if(user_t==='establishment'){
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedapp/")
        const data1=await response2.json()
        set_table_data(data1)
      }
      else if(user_t ==="superintendent"){
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedjasst/")
        set_table_data( await response2.json())
      }
  
      else if(user_t ==="registrar"){
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/gethodapprovedjspr/")
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
        <button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none",marginLeft:"15px"}} onClick={search_empCode_all}>Show all</button>
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
          </tr>
          {tb.map((element, index) => (
            <tr data-index={index}>
            <td>{element.requestid}</td>
            <td>{element.empcode}</td>
            <td>{element.day_date_submitted}</td>
            <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
            <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}}  onClick={viewVerdict} data-arg={index}>Verdict</button></td>
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
            <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={viewVerdict} data-arg={index}>Verdict</button></td>
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
