import React, { useState, useEffect} from 'react';
import styles from './mytable.module.css';
import { auth } from '../firebase-config';
import {useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const PreviousApp = ()=>{
  const navigate = useNavigate();
  const [data3,setdata3]=useState([]);
  const [emp,setemp]=useState(0);
  useEffect(() => {
    const func = async ()=>{
      const response = await fetch("https://ltc-mgmt.herokuapp.com/getecode/"+ auth.currentUser.uid)
      const {empcode} =  await response.json()
      setemp(empcode)

      const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getprevious/"+empcode)
      setdata3( await response2.json())
    }
    func()
  }, []);

  var current = new Date();
  var date = current.getDate() + '-' + (current.getMonth()+1) + '-' + current.getFullYear();
  var dt = date.toString();
  let tb_0 = [...data3]
  


  const viewApp = async(event)=>{
    let rowId = event.target.getAttribute('data-arg');
    const reqId = tb_0[rowId].requestid
    const flag=1;
    navigate("/application/"+reqId+"/"+auth.currentUser.uid+"/"+flag+"/-1");
  }  
  const[verdict,setVerdict]=useState([])
  const [flag,setflag]=useState(0);
  const[comment,setComment]=useState([])


  
  const viewVerdict=async(event)=>{
    let rowId = event.target.getAttribute('data-arg');
    console.log(rowId,"ye hai row id")
    const reqId = tb_0[rowId].requestid

    const response = await fetch("https://ltc-mgmt.herokuapp.com/get_verdict/"+reqId);
    setVerdict(await response.json())
    const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_comments/"+reqId);
    setComment(await response1.json())
    setflag(1);
  }
  let tb_1 =[...verdict]
  const back_btn = () => {
    setflag(0)
  }
  const makecopy =(event)=>{
    let rowId = event.target.getAttribute('data-arg');
    console.log(rowId,"ye hai row id")
    const reqId = tb_0[rowId].requestid
    navigate("/userpage/"+auth.currentUser.uid+"/newApplication/"+reqId)

  }



  return(
    <div style={{width: "94%",margin:"auto"}}>
      {flag==0?
      <>
        <table className={styles.contents}>
        <tr>
          <th>Request Id</th>
          <th>Date</th>
          <th>View Application</th>
          <th>Comments</th>
          <th>Make Copy</th>
          </tr>
          {tb_0.map((element, index) => (
            <tr data-index={index}>
            <td>{element.requestid}</td>
            <td>{element.day_date_submitted}</td>
            <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
            <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={viewVerdict} data-arg={index}>Verdict</button></td>
            <td><button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}} onClick={makecopy} data-arg={index}>Make a copy</button></td>
            </tr>
        ))}
      </table>
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
  );
}
export default PreviousApp;
