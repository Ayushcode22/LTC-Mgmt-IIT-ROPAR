import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import {useNavigate } from "react-router-dom";
import styles from './mytable.module.css';
import {FaSearch} from "react-icons/fa";

export default function AdminNewApp() {

  const [data3,setdata3]=useState([]);
  useEffect(() => {
    const func =async()=>{

        const response = await fetch("https://ltc-mgmt.herokuapp.com/getdept/"+auth.currentUser.uid)
        const {department} =  await response.json()
    
        const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getapplications/"+department)
        setdata3( await response2.json())
      }
    func()
  }, []);

  const navigate = useNavigate();

  const[details,setdetails]=React.useState({
    firstname: "",
    lastname: "",
    empcode: 0,
    designation: "Student",
    department: "CSE",
    joindate: "2022-03-12T18:30:00.000Z",
    bandpay: "10-20",
    leavenature: "Sick",
    leavefrom: "2022-02-28T18:30:00.000Z",
    leaveto: "2022-03-06T18:30:00.000Z",
    leavenoofdays: 10,
    prefixfrom: "2022-03-07T18:30:00.000Z",
    prefixto: "2022-03-20T18:30:00.000Z",
    suffixfrom: "2022-03-13T18:30:00.000Z",
    suffixto: "2022-03-22T18:30:00.000Z",
    spouse: "Yes, Entitled to LTC",
    selffrom: "2022-03-07T18:30:00.000Z",
    selfto: "2022-03-13T18:30:00.000Z",
    familyfrom: "2022-03-09T18:30:00.000Z",
    familyto: "2022-03-22T18:30:00.000Z",
    hometown: "lfyg",
    natureofltc: "ldfug",
    placename: "liuwegf",
    estimatedfare: 10000,
    advancedrequired: "Yes",
    encashmentrequired: "Yes",
    encashmentdays: 3,
    blockyear: "2020"
})
let data;

const viewApp = async(event)=>{
  let rowId = event.target.getAttribute('data-arg');
  const reqId = tb[rowId].requestid
  const flag=0
  // Navigate to adminviewapplication
  navigate("/application/"+reqId+"/"+auth.currentUser.uid+"/"+flag+"/-1");
}

  var current = new Date();
  var date = current.getDate() + '-' + (current.getMonth()+1) + '-' + current.getFullYear();
  var dt = date.toString();
  const [flag,setflag]=useState(0);
  let tb =[]
    // let obj = {id: 2, application: "any", date: dt, status: "Pending"}
    tb = [...data3]
  const[emp,setemp]=useState();
  const[emp_flag,set_emp_flag]=useState(0);
    const[table_data,set_table_data]=useState([]);
    const search_empCode=async()=>{
      set_emp_flag(1);
      const response = await fetch("https://ltc-mgmt.herokuapp.com/getdept/"+auth.currentUser.uid)
      const {department} =  await response.json()
      const response1 = await fetch("https://ltc-mgmt.herokuapp.com/get_emp_prev_applications/"+emp+"/"+department)
      const data1 = await response1.json();
      set_table_data(data1)
    }

    const search_empCode_all=async()=>{
      set_emp_flag(1);
      const response = await fetch("https://ltc-mgmt.herokuapp.com/getdept/"+auth.currentUser.uid)
      const {department} =  await response.json()
  
      const response2 = await fetch("https://ltc-mgmt.herokuapp.com/getapplications/"+department)
      set_table_data( await response2.json())
      
    }
    return (
      <div style={{width: "94%",margin:"auto"}}>
      {flag==0?
  <>
  <div className={styles.search_container}>
    <input type="text" placeholder="Search With EmpCode.." value={emp} onChange={(e)=>{setemp(e.target.value)}} style={{height:"30px"}} />
    <FaSearch onClick={search_empCode} size={25} style= {{marginLeft:"10px"}}/>
    <button  style={{background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none",marginLeft:"15px"}} onClick={search_empCode_all}>Show all</button>
  </div>
  {/* <button onClick={search_empCode}>search</button> */}
    {emp_flag==0?
    <>
    <table className={styles.contents}>
    <tr>
      <th>Request Id</th>
      <th>Employee code</th>
      <th>Date</th>
      <th>View Application</th>
      </tr>
      {tb.map((element, index) => (
        <tr data-index={index}>
        <td>{element.requestid}</td>
        <td>{element.empcode}</td>
        <td>{element.day_date_submitted}</td>
        <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
        </tr>
    ))}
  </table>
    </>
    :
    <>
    <table className={styles.contents}>
    <tr>
      <th>Request Id</th>
      <th>Employee code</th>
      <th>Date</th>
      <th>View Application</th>
      </tr>
      {table_data.map((element, index) => (
        <tr data-index={index}>
        <td>{element.requestid}</td>
        <td>{element.empcode}</td>
        <td>{element.day_date_submitted}</td>
        <td><button onClick={viewApp} type="button" className={styles.linkbtn} data-arg={index}>View Application</button></td>
        </tr>
    ))}
  </table>
    </>
    }
    
  </>
  :<></>
        
      }
    </div>
      );
}
