import React , { useState, useEffect }from "react";
import { useNavigate,useParams} from "react-router-dom"
import { auth } from "../firebase-config";
import styles from './AdminViewAppl.module.css';
const Form =() => {
    const  {uid,reqid,flag,empcode}=useParams()
    const [data,setdata]=useState({
    firstname:'',
    lastname:'',
    empcode:0,
    designation:'',
    department:'',
    joindate:'',
    bandpay:'',
    leavenature:'',
    leavefrom:'',
    leaveto:'',
    leavenoofdays:'',
    prefixfrom:'',
    prefixto:'',
    suffixfrom:'',
    suffixto:'',
    spouse:'',
    selffrom:'',
    selfto:'',
    familyfrom:'',
    familyto:'',
    hometown:'',
    natureofltc:'',
    placename:'',
    estimatedfare:'',
    advancedrequired:'',
    encashmentrequired:'',
    encashmentdays:0,
    blockyear:''
    })

    const [user_t,set_user]=useState("")

    const [table_data,set_tabledata]=useState([])
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    const navigate = useNavigate();
    const[e_code,setempcode]=useState(0);

    useEffect(() => {
        const func= async()=>{
            const response =  await fetch("https://ltc-mgmt.herokuapp.com/viewApplication/"+reqid)
            const data1 = await response.json()
            const response2 =  await fetch("https://ltc-mgmt.herokuapp.com/gettabledata/"+reqid)
            const data2=await response2.json()
            set_tabledata(data2)
            const response3 = await fetch("https://ltc-mgmt.herokuapp.com/getusertype/"+auth.currentUser.uid)
            const data3 = await response3.json()

            const response4 = await fetch("https://ltc-mgmt.herokuapp.com/getecode/"+auth.currentUser.uid)
            const {empcode} =  await response4.json()
            setempcode(empcode);
            set_user(data3)
            setdata(data1)
        }
        func()
      }, []);


    
    const [disable, setDisable] = React.useState(false);
    const [text,settext]=React.useState("Add Comment");
    const [com,setcomment]=React.useState("")
    const e={
        reqid:reqid,
        date:date,
        comment:com,
        empcode:empcode
    }

    const comment=()=>{
        setDisable(true)
        settext("Comments Added")
    }

    const forward_to=async()=>{
        if(user_t === "admin"){
            navigate("/adminpage/"+auth.currentUser.uid+"/new")
            const response1 = await fetch("https://ltc-mgmt.herokuapp.com/HOD_Approval"+reqid,{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
            });
            
        }
        else if(user_t==="establishment"){
            navigate("/EstForm1/"+reqid+"/"+auth.currentUser.uid+"/"+empcode)
            const response = await fetch("https://ltc-mgmt.herokuapp.com/establishment",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
           });
        }
        else if (user_t==="dean"){
            navigate("/deanpage/"+auth.currentUser.uid+"/new")
            const response1 = await fetch("https://ltc-mgmt.herokuapp.com/dean_update/"+reqid,{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
            });
        }
    }


    const revert_back=async()=>{
        if(user_t === "admin"){
            navigate("/adminpage/"+auth.currentUser.uid+"/new")
            const response1 = await fetch("https://ltc-mgmt.herokuapp.com/HOD_Revert",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
            });
            
        }
        else if(user_t==="establishment"){
            navigate("/estabpage/"+auth.currentUser.uid+"/new")
            const response = await fetch("https://ltc-mgmt.herokuapp.com/establishment_Revert",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
           });
        }
        else if (user_t==="dean"){
            navigate("/deanpage/"+auth.currentUser.uid+"/new")
            const response1 = await fetch("https://ltc-mgmt.herokuapp.com/Dean_Approval/"+reqid,{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(e)
            });
        }
    }
    
    
    return(
        <>
        <div className={styles.container}>
            <p style={{fontWeight: "700",textAlign: "center",fontSize:"large",marginBottom: "8px",textDecoration:"underline"}}>APPLICATION FOR LEAVE TRAVEL CONCESSION</p>
            <table className={styles.hod} style={{width:"100%"}}>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>1</td>
                    <td className={styles.tag} style={{width:"35%"}}> Name of the Employee with Employee Code </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.firstname+" "+data.lastname+" "+data.empcode}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>2</td>
                    <td className={styles.tag} style={{width:"35%"}}> Designation and Department </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.designation+" "+data.department}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>3</td>
                    <td className={styles.tag} style={{width:"35%"}}> Date of entering the Central Government Service/Date of Joining with IIT Ropar </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.joindate.substring(0,10)}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>4</td>
                    <td className={styles.tag} style={{width:"35%"}}> Band Pay + AGP/GP </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.bandpay}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>5</td>
                    <td className={styles.tag} style={{width:"35%"}}> Leave required </td>
                    <td className={styles.field} style={{width:"62.5%"}}>
                        <p style={{margin : "0"}}>Nature : {data.leavenature} &nbsp;From : {data.leavefrom.substring(0,10)} &nbsp;To : {data.leaveto.substring(0,10)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. of days {data.leavenoofdays}</p>
                        <p style={{margin: "0.3% 0 0 0"}}>Prefix: &nbsp;&nbsp;From : {data.prefixfrom.substring(0,10)}&nbsp;To :{data.prefixto.substring(0,10)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suffix: &nbsp;&nbsp;From : {data.suffixfrom.substring(0,10)}&nbsp;To : {data.suffixto.substring(0,10)}</p>
                    </td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>6</td>
                    <td className={styles.tag} style={{width:"35%"}}> Whether spouse is employed, if yes whether entitled to LTC </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.spouse}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>7</td>
                    <td className={styles.tag} style={{width:"35%"}}> Proposed dates of Journey </td>
                    <td className={styles.field} style={{width:"62.5%",padding: "0",border: "0"}}>
                        <table style={{width: "100%",border: "0"}}>
                            <tr>
                                <th></th>
                                <th> Date of Outward journey </th>
                                <th> Date of Inward journey </th>
                            </tr>
                            <tr>
                                <td>Self</td>
                                <td>{data.selffrom.substring(0,10)}</td>
                                <td>{data.selfto.substring(0,10)}</td>
                            </tr>
                            <tr>
                                <td>Family</td>
                                <td>{data.familyfrom.substring(0,10)} </td>
                                <td>{data.familyto.substring(0,10)}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>8</td>
                    <td className={styles.tag} style={{width:"35%"}}> Home Town as recorded in the Service Book </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.hometown}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>9</td>
                    <td className={styles.tag} style={{width:"35%"}}> Nature of LTC to be availed, Home Town/Anywhere in India with Block Year </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.natureofltc}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>10</td>
                    <td className={styles.tag} style={{width:"35%"}}> If, anywhere in India, the place to be visited </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.placename}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>11</td>
                    <td className={styles.tag} style={{width:"35%"}}> Estimated fare of entitled class from the headquarter to Home Town/Place of visit by shortest route </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.estimatedfare}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>12</td>
                    <td className={styles.tag} style={{width:"35%",padding : "0"}} colspan="2">&nbsp; Person(s) in respect of whom LTC is proposed to be availed.  
                        <table style={{width: "100%",marginTop: "0.3%"}}>
                            <tr>
                                <th style={{width: "3%"}}>S No.</th>
                                <th style={{width: "32.85%"}}>Name</th>
                                <th style={{width: "5%"}}>Age</th>
                                <th style={{width: "10%"}}>Relationship</th>
                                <th style={{width: "15%"}}>Travelling From</th>
                                <th style={{width: "15%"}}>Travelling To</th>
                                <th style={{width: "10%"}}>Travelling Back(Yes/No)</th>
                                <th style={{width: "10%"}}>Mode of Travel</th>
                            </tr>
                            {table_data.map((table_data, index) => (
                                <tr data-index={index}>
                                    <td>{table_data.serial}</td>
                                    <td>{table_data.name}</td>
                                    <td>{table_data.age}</td>
                                    <td>{table_data.relation}</td>
                                    <td>{table_data.tfrom}</td>
                                    <td>{table_data.tto}</td>
                                    <td>{table_data.tback}</td>
                                    <td>{table_data.mode}</td>
                                </tr>
                            ))}
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>13</td>
                    <td className={styles.tag} style={{width:"35%"}}> Advance Required </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.advancedrequired}</td>
                </tr>
                <tr>
                    <td className={styles.serial} style={{width:"2.5%"}}>14</td>
                    <td className={styles.tag} style={{width:"35%"}}> Encashment of earned leave required </td>
                    <td className={styles.field} style={{width:"62.5%"}}>{data.encashmentrequired} <span style={{fontWeight:"500",marginLeft:"200px"}}>No Of days:{data.encashmentdays}</span></td>
                </tr>
            </table>
            <p style={{fontWeight: "600"}}>
            I undertake (a) to produce the tickets for the journey within ten days of receipt of the advance (b) to refund the entire advance in lump 
            sum, in the event of cancellation of the journey within two months from the date of drawl of the advance or failure to produce the tickets 
            within 10 days of drawl the advance (c) to travel by Air/Rail/Road as per my entitlement and as per GOI LTC rules or specific rules as 
            adopted by the Institute (d) to refund the excess advance drawn, if any, within 7 working days of completion of the journey (e) to submit 
            necessary bills, money receipts and other documents** as required under the Rules and Regulations of the Institute within one month 
            (where advance is drawn) / three months (where no advance is drawn), from the date of completion of the journey.
            I will communicate to the competent authority about any change of declared place of visit or change of dates before the commencement 
            of the journey.
            </p>
            <p style={{fontWeight: "700"}}> Certified That:</p>
            <ol style={{fontWeight: "600"}}>
                <li> The information, as given above is true to the best of my knowledge and belief; and </li>
                <li> My spouse is not employed in Government service / my spouse is employed in government service and the concession has not been availed of by him/her separately of himself/herself or for any of the family members for the {data.blockyear} block year.</li>
            </ol>
            {flag!=1?
            <>
                <div class={styles.form_group}>
                <label for="Comments" class="form-label" style={{marginBottom: "1%",fontWeight:"bold",fontSize: "120%"}}>Any Comments:</label>
                <textarea class="form-control" id="comments" rows="8" style={{marginBottom: "1%"}} onChange={(e)=>{setcomment(e.target.value)}} ></textarea>
                </div>
                <button disabled={disable} type="submit" className={styles.add} class="btn btn-primary" onClick={comment}>{text}</button>
                <div className={styles.btns}>
                    <button type="button" className={styles.revert} onClick={revert_back}>Revert Back with comments</button>
                    <button type="button" className={styles.forward} onClick={forward_to}>Forward</button>
                </div>
            </>:<></>}
            
        </div>
        </>
    )
}
export default Form