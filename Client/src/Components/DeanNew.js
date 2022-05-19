import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import {useNavigate } from "react-router-dom";
import styles from './mytable.module.css';
import {FaSearch} from "react-icons/fa";

export default function DeanNew() {
    const [data3,setdata3]=useState([]);
    useEffect(() => {
      const func =async()=>{
  
        const response3 = await fetch("https://ltc-mgmt.herokuapp.com/getusertype/"+auth.currentUser.uid)
        const data = await response3.json()
        
          const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_new/")
          setdata3( await response2.json())
        }
      func()
    }, []);
  
    const navigate = useNavigate();
    const[verdict,setVerdict]=useState([])
    const [flag,setflag]=useState(0);
    const[emp,setemp]=useState();
    const[emp_flag,set_emp_flag]=useState(0);
  const viewApp = async(event)=>{
    let rowId = event.target.getAttribute('data-arg');
    const reqId = tb[rowId].requestid
    const flag1=0
    navigate("/viewForm4/"+reqId+"/"+auth.currentUser.uid+"/"+flag1);
  }
  
    var current = new Date();
    var date = current.getDate() + '-' + (current.getMonth()+1) + '-' + current.getFullYear();
    var dt = date.toString();
    let tb =[]
      tb = [...data3]
      const[comment,setComment]=useState();
      

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

    const[table_data,set_table_data]=useState([]);
    const search_empCode=async()=>{
      set_emp_flag(1);
      const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_new_emp_applications_dean/"+emp)
      const data1 = await response1.json();
      set_table_data(data1)
    }

    const search_empCode_all=async()=>{
      set_emp_flag(1);
      const response2 = await fetch("https://ltc-mgmt.herokuapp.com/get_new/")
      set_table_data( await response2.json())
    }
  return (
    <>
    <div style={{width: "94%",margin:"auto"}}>
    {flag==0?
    
    <>
    <div className={styles.search_container}>
      <input type="text" placeholder="Search With EmpCode.." value={emp} onChange={(e)=>{setemp(e.target.value)}} style={{height:"30px"}} />
      <FaSearch onClick={search_empCode} size={25} style= {{marginLeft:"10px"}}/>
      <button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none",marginLeft:"15px"}}  onClick={search_empCode_all}>Show all</button>
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
          <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={viewVerdict} data-arg={index}>Verdict</button></td>
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
