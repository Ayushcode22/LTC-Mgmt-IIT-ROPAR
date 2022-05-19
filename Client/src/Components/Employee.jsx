import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Table from 'material-table';
import { useState,useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import { auth } from '../firebase-config';
import styles from './NewApplication.module.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './extra.css';


function Employee(props){
    const {reqId}=useParams()
    const[flag_ref,set_flag_ref]=useState(reqId);
    useEffect(() => {
        const Autofill =async()=>{
            const response=await fetch ("https://ltc-mgmt.herokuapp.com/auto_populate/"+auth.currentUser.uid)
            const d=await response.json()
            let date=d[0].joining_date
            let year=date.substr(0, 4)
            let month=date.substr(5,2)
            let day=date.substr(8,2)
            let n=year+"-"+month+"-"+day
            setemployee({...employee,["FirstName"]:d[0].first_name,["LastName"]:d[0].last_name,["EmpCode"]:d[0].empcode,["BandPay"]:d[0].band_pay,["Dept"]:d[0].department,["Designation"]:d[0].designation,["JoinDate"]:n})  
        }
            const func=async()=>{
                const response = await fetch("https://ltc-mgmt.herokuapp.com/makecopy_data/"+reqId);
                const d = await response.json()

                const response1 = await fetch("https://ltc-mgmt.herokuapp.com/makecopy_table_data/"+reqId);
                const dd1 = await response1.json()
                setTableData(dd1)
                var date=new Date(d.leavefrom)
                date.setDate(date.getDate()+1)
                var d1=date.toISOString().substr(0,10)

                var date1=new Date(d.leaveto)
                date1.setDate(date1.getDate()+1)
                var d2=date1.toISOString().substr(0,10)

                var date2=new Date(d.selffrom)
                date2.setDate(date2.getDate()+1)
                var d3=date2.toISOString().substr(0,10)

                var date3=new Date(d.selfto)
                date3.setDate(date3.getDate()+1)
                var d4=date3.toISOString().substr(0,10)

                var date4=new Date(d.familyfrom)
                date4.setDate(date4.getDate()+1)
                var d5=date4.toISOString().substr(0,10)

                var date5=new Date(d.familyto)
                date5.setDate(date5.getDate()+1)
                var d6=date5.toISOString().substr(0,10)

                var date6=new Date(d.prefixfrom)
                date6.setDate(date6.getDate()+1)
                var d7=date6.toISOString().substr(0,10)

                var date7=new Date(d.prefixto)
                date7.setDate(date7.getDate()+1)
                var d8=date7.toISOString().substr(0,10)

                var date8=new Date(d.suffixfrom)
                date8.setDate(date8.getDate()+1)
                var d9=date8.toISOString().substr(0,10)

                var date9=new Date(d.suffixto)
                date9.setDate(date9.getDate()+1)
                var d10=date9.toISOString().substr(0,10)
                
                setLTC({["leavefrom"]:d1,["leaveto"]:d2,["selffrom"]:d3,["selfto"]:d4,["familyfrom"]:d5,["familyto"]:d6,
            ["prefixfrom"]:d7,["prefixto"]:d8,["suffixfrom"]:d9,["suffixto"]:d10,["numRows"]:dd1.length,["checked"]:null,["url"]:"",["leavenature"]:d.leavenature,
        ["leavenoofdays"]:d.leavenoofdays,["spouse"]:d.spouse,["hometown"]:d.hometown,["natureofltc"]:d.natureofltc,["placename"]:d.placename,
    ["estimatedfare"]:d.estimatedfare.toString() ,["advancedrequired"]:d.advancedrequired,["encashmentrequired"]:d.encashmentrequired,["encashmentdays"]:d.encashmentdays,
["blockyear"]:d.blockyear})

            }
            
            set_flag_ref(reqId);
        if(flag_ref!=-1){
            func();
        }
        Autofill()
        
      }, []);

    const navigate = useNavigate();

    const [LTC,setLTC]=useState({
        leavenature:"",
        leavefrom:null,
        leaveto:null,
        leavenoofdays:"",
        spouse:"",
        selffrom:null,
        selfto:null,
        familyfrom:null,
        familyto:null,
        prefixfrom:null,
        prefixto:null,
        suffixfrom:null,
        suffixto:null,
        hometown:"",
        natureofltc:"",
        placename:"",
        estimatedfare:"",
        advancedrequired:"",
        encashmentrequired:"",
        encashmentdays:'',
        checked:null,
        blockyear:"",
        numRows:0,
        url:""
    })
    const [data,setdata]=useState([])
    const [count,setcount]=useState(0);
    
        const Autofill =async()=>{
            const response=await fetch ("https://ltc-mgmt.herokuapp.com/auto_populate/"+auth.currentUser.uid)
            const d=await response.json()
            let date=d[0].joining_date
            let year=date.substr(0, 4)
            let month=date.substr(5,2)
            let day=date.substr(8,2)
            let n=year+"-"+month+"-"+day
            setemployee({...employee,["FirstName"]:d[0].first_name,["LastName"]:d[0].last_name,["EmpCode"]:d[0].empcode,["BandPay"]:d[0].band_pay,["Dept"]:d[0].department,["Designation"]:d[0].designation,["JoinDate"]:n})
    
        }
        
    const inputEventltc=async(e)=>{

        

        if (e.target.id==='t-int')
        {
            const num=Number(e.target.value)
            if(Number.isInteger(num) )
            {
                setLTC({...LTC,[e.target.name]:e.target.value});
            }
        }
        else
        {
            setLTC({...LTC,[e.target.name]:e.target.value});
        }
        
    }

    const[tableData,setTableData] = React.useState([]);
    const columns =[
        {title: "Serial No.",field:"serial"},
        {title:"Name",field:"name"},
        {title:"Age",field:"age"},
        {title:"Relationship",field:"relation"},
        {title:"Travelling(Place) From",field:"tfrom"},
        {title:"Travelling(Place) To",field:"tto"},
        {title:"Travelling Back (Yes/No)",field:"tback",lookup:{yes:"Yes",no:"No"}},
        {title:"Mode of Travel",field:"mode"}
    ];

    // Employee Code Starts

    const[employee,setemployee]=React.useState({
        FirstName:'',
        LastName:'',
        EmpCode:'',
        Designation:'',
        Dept:'',
        JoinDate:null,
        BandPay:''
    })
    var s_1;
    const input_file=(e)=>{
        let file=e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        var ss
        reader.onload=(e)=>{
            s_1=e.target.result
             ss=e.target.result.substring(28)
            setLTC({...LTC,["filedata"]:e.target.result})
            
            
              
        }
        let pdfWindow = window.open("");
        pdfWindow.document.write("<html<head><title>"+"PK"+"</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>");
        pdfWindow.document.write("<body><embed width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(e.target.result)+"#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>");
    }
    const inputEventemp=async(e)=>{
        setemployee({...employee,[e.target.name]:e.target.value});
    }
    
    const[trig,settrig]=useState(0);

    const submit=(e)=>{
        settrig(1);
        props.getdata(employee,tableData,LTC,1);
        e.preventDefault();
    }

    const preview=(e)=>{
        // settrig(1);
        props.getdatapreview(employee,tableData,LTC,0);
        e.preventDefault();
        props.printForm(employee, true);
    }

    const printdoc=()=>{
        props.printForm(employee, false);
        navigate("/userpage/"+auth.currentUser.uid)
    }
    const [pdf , setPdf] = useState('');
    const upload = ()=>{
        if(pdf == null) {
            return;
        }

        const storage = getStorage();
        var millisecond = new Date().getTime();
        const spaceRef = ref(storage, 'images/'+pdf.name.substr(0, pdf.name.length-4) + '_' + millisecond);
        const uploadTask = uploadBytesResumable(spaceRef, pdf);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
            case 'paused':
                break;
            case 'running':
                break;
            }
        }, 
        (error) => {
            
            alert('Error');
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setLTC({...LTC,["url"]:downloadURL});
                alert("File Uploaded");
            });
        }
        );

    }

    const[filename,setFileName]=useState([]);


    return(
        <div className= {styles.container}>
        <form onSubmit={submit}>
        <div className={styles.employee_details}>
            <h3 className={styles.myheading}>Employee Details</h3>
            <div className={styles.name_code}>
                <p>Employee Name & Code:</p>
                <TextField required id="outlined-basic" disabled="true" label="First Name" size='small' variant="outlined" name='FirstName' value={employee.FirstName} onChange={inputEventemp} />
                <TextField required id="outlined-basic" disabled="true" label="Last Name" size='small' variant="outlined" name='LastName' value={employee.LastName} onChange={inputEventemp}  />
                <TextField required id="outlined-basic" disabled="true" label="Employee Code" size='small' variant="outlined" name='EmpCode' value={employee.EmpCode} onChange={inputEventemp} />
            </div>
            <div className={styles.des_dep}>
                <p>Designation & Department:</p>
                <TextField required id="outlined-basic" disabled="true" label="Designation" size='small' variant="outlined" name='Designation' value={employee.Designation} onChange={inputEventemp}  />
                <TextField required id="outlined-basic" disabled="true" label="Department" size='small' variant="outlined" name='Dept' value={employee.Dept} onChange={inputEventemp}  />
                
            </div>
            <div className={styles.joining}>
                <p>Date of entering the Central Government Service/Date of Joining with IIT Ropar:</p>
                <TextField required
                    id="date"
                    disabled="true"
                    label="Date of joining"
                    type="date"
                    size='small'
                    value={employee.JoinDate}
                    name='JoinDate'
                    onChange={(e)=>{{setemployee({...employee , [e.target.name] : e.target.value } ) }}}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <p>Band Pay + AGP/GP:</p>
                <TextField required id="outlined-basic" disabled="true" label="₹" size='small' variant="outlined" name='BandPay' value={employee.BandPay} onChange={inputEventemp} />
            </div>
        </div>
        {/* , */}
                  
        {/* LTC Details */}


        <div className={styles.ltc_details}>
            <h3 className={styles.myheading}>LTC Details</h3>
            <div className={styles.leave}>
                <p>Leave Required:</p>
                <TextField required id="outlined-basic" label="Nature" size='small' variant="outlined" name='leavenature' value={LTC.leavenature} onChange={inputEventltc} />
                <TextField required
                    id="date"
                    label="From"
                    type="date"
                    size='small'
                    value={LTC.leavefrom}
                    name='leavefrom'
                    onChange={(e)=>{
                        if (LTC.leaveto != null) {
                            if (Date.parse(LTC.leaveto) - Date.parse(e.target.value) >= 0) {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                                setLTC({...LTC,["leavenoofdays"]:(Date.parse(LTC.leaveto)+86400000-Date.parse(e.target.value))/86400000});
                            }
                            else {
                                e.target.value = null
                            }
                        }
                        else {
                            setLTC({...LTC,[e.target.name]:e.target.value});
                        }
                    }}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField required
                    id="date"
                    label="To"
                    type="date"
                    size='small'
                    value={LTC.leaveto}
                    name='leaveto'
                    onChange={(e)=>{
                        setLTC({...LTC,[e.target.name]:e.target.value,["leavenoofdays"]:(Date.parse(e.target.value)+86400000-Date.parse(LTC.leavefrom))/86400000});
                    }}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField required id="t-int" disabled="true" label="No. Of Days" size='small' variant="outlined" name='leavenoofdays' value={LTC.leavenoofdays} onChange={inputEventltc} />
            </div>
            <div className={styles.prefix_suffix}>
                <div className={styles.prefix}>
                    <p>Prefix:</p>
                    <TextField required
                        id="date"
                        label="From"
                        type="date"
                        size='small'
                        value={LTC.prefixfrom}
                        name='prefixfrom'
                        onChange={(e)=>{
                            if (LTC.prefixto != null) {
                                if (Date.parse(LTC.prefixto) - Date.parse(e.target.value) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField required
                        id="date"
                        label="To"
                        type="date"
                        size='small'
                        value={LTC.prefixto}
                        name='prefixto'
                        onChange={(e)=>{
                            if (LTC.prefixfrom != null) {
                                if (Date.parse(e.target.value) - Date.parse(LTC.prefixfrom) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div className={styles.suffix}>
                    <p>Suffix:</p>
                    <TextField required
                        id="date"
                        label="From"
                        type="date"
                        size='small'
                        value={LTC.suffixfrom}
                        name='suffixfrom'
                        onChange={(e)=>{
                            if (LTC.suffixto != null) {
                                if (Date.parse(LTC.suffixto) - Date.parse(e.target.value) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField required
                        id="date"
                        label="To"
                        type="date"
                        size='small'
                        value={LTC.suffixto}
                        name='suffixto'
                        onChange={(e)=>{
                            if (LTC.suffixfrom != null) {
                                if (Date.parse(e.target.value) - Date.parse(LTC.suffixfrom) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
            </div>
            <div className={styles.spouse}>
                <p >Whether spouse is employed, if yes whether entitled to LTC:</p>
                <FormControl style={{width: "20%",paddingTop: "0.5%"}}>
                    <InputLabel id="select-label">Select</InputLabel>
                    <Select required
                    labelId="select-label"
                    id="simple-select"
                    name='spouse'
                    value={LTC.spouse}
                    label="Select"
                    size='small'
                    onChange={(event)=>{setLTC({...LTC,spouse:event.target.value})}}
                    >
                    <MenuItem value={"Yes, Entitled to LTC"} style={{padding:"5px 10px 5px 10px"}}>Yes, Entitled to LTC</MenuItem>
                    <MenuItem value={"Yes, Not Entitled to LTC"} style={{padding:"5px 10px 5px 10px"}}>Yes, Not Entitled to LTC</MenuItem>
                    <MenuItem value={"No"} style={{padding:"5px 10px 5px 10px"}}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles.journey_date}>
                <div className={styles.self}>
                    <p>Proposed dates of Journey:</p>
                    <p>Self:</p>
                    <TextField required
                        id="date"
                        label="From"
                        type="date"
                        size='small'
                        value={LTC.selffrom}
                        name='selffrom'
                        onChange={(e)=>{
                            if (LTC.selfto != null) {
                                if (Date.parse(LTC.selfto) - Date.parse(e.target.value) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField required
                        id="date"
                        label="To"
                        type="date"
                        size='small'
                        value={LTC.selfto}
                        name='selfto'
                        onChange={(e)=>{
                            if (LTC.selffrom != null) {
                                if (Date.parse(e.target.value) - Date.parse(LTC.selffrom) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                <div className={styles.family}>
                    <p>Family:</p>
                    <TextField required
                        id="date"
                        label="From"
                        type="date"
                        size='small'
                        value={LTC.familyfrom}
                        name='familyfrom'
                        onChange={(e)=>{
                            if (LTC.familyto != null) {
                                if (Date.parse(LTC.familyto) - Date.parse(e.target.value) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField required
                        id="date"
                        label="To"
                        type="date"
                        size='small'
                        value={LTC.familyto}
                        name='familyto'
                        onChange={(e)=>{
                            if (LTC.familyfrom != null) {
                                if (Date.parse(e.target.value) - Date.parse(LTC.familyfrom) >= 0) {
                                    setLTC({...LTC,[e.target.name]:e.target.value});
                                }
                                else {
                                    e.target.value = null
                                }
                            }
                            else {
                                setLTC({...LTC,[e.target.name]:e.target.value});
                            }
                        }}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
            </div>
            <div className={styles.town}>
                <p>Home Town as recorded in the Service Book:</p>
                <TextField required id="outlined-basic" label="Hometown Name" size='small' variant="outlined" name='hometown' value={LTC.hometown} onChange={inputEventltc}/>
            </div>
            <div className={styles.nature_ltc}>
                <p>Nature of LTC to be availed, Home Town/Anywhere in India with Block Year:</p>
                <TextField required id="outlined-basic" label="Nature of LTC" size='small' variant="outlined" name='natureofltc' value={LTC.natureofltc} onChange={inputEventltc} />
            </div>
            <div className={styles.place_visited}>
                <p>If, anywhere in India, the place to be visited:</p>
                <TextField required id="outlined-basic" label="Place Name" size='small' variant="outlined" name='placename' value={LTC.placename} onChange={inputEventltc}/>
            </div>
            <div className={styles.fare}>
                <p>Estimated fare of entitled class from the headquarter to Home Town/Place of visit by shortest route:</p>
                <TextField required id="t-int" label="₹" size='small' variant="outlined" name='estimatedfare' value={LTC.estimatedfare} onChange={inputEventltc} />
                <div>
                <label for="formFile" class="form-label">Proof</label>&nbsp;&nbsp;
                <input style={{width: "60%"}} type="file" id="test" name="test" onChange={(e)=>{setPdf(e.target.files[0])}}/>
                {/* <button onClick={upload}>upload</button> */}
                <Button variant="contained" component="span" onClick={upload}>upload</Button>
                </div>
            </div>
            <div className={styles.person_details}>
                <Table style={{width:"80%", backgroundColor:"transparent"}} columns={columns} data = {tableData} 
                    editable = {{
                        onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                            setLTC({...LTC,numRows:LTC.numRows+1})
                            setTableData([...tableData,newRow])
                            resolve()
                        }),
                        onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
                            const updatedData = [...tableData]
                            updatedData[oldRow.tableData.id] = newRow
                            setTableData(updatedData)
                            resolve()
                        }),
                        onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                            const updatedData = [...tableData]
                            updatedData.splice(selectedRow.tableData.id,1)
                            setTableData(updatedData)
                            setLTC({...LTC,numRows:LTC.numRows-1})
                            resolve()
                        })
                    }}
                    options={{search : false,addRowPosition:"first", actionsColumnIndex:-1, paging:false,headerStyle:{fontSize:"90%",background:"transparent"},style:{fontSize:"0%",background:"transparent"}}}
                    title = {<h3>Person(s) in respect of whom LTC is proposed to be availed:</h3>} /> 
            </div>
            <div className={styles.advance}>
                <p>Advance Required:</p>
                <FormControl  style={{width: "7%",paddingTop: "0.5%"}}>
                    <InputLabel id="select-label_back">Yes/No</InputLabel>
                    <Select required
                    labelId="select-label_back"
                    id="simple-select_back"
                    name='advancedrequired'
                    value={LTC.advancedrequired}
                    label="Yes/No"
                    size='small'
                    onChange={inputEventltc}
                    >
                    <MenuItem value={"Yes"} style={{padding:"5px 10px 5px 10px"}}>Yes</MenuItem>
                    <MenuItem value={"No"} style={{padding:"5px 10px 5px 10px"}}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles.encashment}>
                <p>Encashment of earned leave required:</p>
                <FormControl style={{width: "7%",paddingTop: "0.5%"}}>
                    <InputLabel id="select-label_back">Yes/No</InputLabel>
                    <Select required
                    labelId="select-label_back"
                    id="simple-select_back"
                    name='encashmentrequired'
                    value={LTC.encashmentrequired}
                    label="Yes/No"
                    size='small'
                    onChange={inputEventltc}
                    >
                    <MenuItem value={"Yes"} style={{padding:"5px 10px 5px 10px"}}>Yes</MenuItem>
                    <MenuItem value={"No"} style={{padding:"5px 10px 5px 10px"}}>No</MenuItem>
                    </Select>
                </FormControl>
                <p>If Yes:</p>
                <TextField id="t-int" label="No. of Days" size='small' variant="outlined" name='encashmentdays' value={LTC.encashmentdays} onChange={inputEventltc} />
            </div>
            <div className={styles.undertaking}  style={{fontSize:"15px",paddingRight:"80px"}}>
                <Checkbox required checked={LTC.checked} onChange={(newValue) => {setLTC({...LTC,checked:newValue.target.checked})}} inputProps={{ 'aria-label': 'controlled' }}/>
                I undertake (a) to produce the tickets for the journey within ten days of receipt of the advance (b) to refund the entire 
                advance in lump sum, in the event of cancellation of the journey within two months from the date of drawl of the advance or 
                failure to produce the tickets within 10 days of drawl the advance (c) to travel by Air/Rail/Road as per my entitlement and
                as per GOI LTC rules or specific rules as adopted by the Institute (d) to refund the excess advance drawn, if any, within 7
                working days of completion of the journey (e) to submit necessary bills, money receipts and other documents** as required 
                under the Rules and Regulations of the Institute within one month (where advance is drawn) / three months (where no advance 
                is drawn), from the date of completion of the journey. I will communicate to the competent authority about any change of 
                declared place of visit or change of dates before the commencement of the journey.
            </div>
            <h3 style={{marginBottom: "0"}}>Certified that:</h3>
            <div className={styles.certification} style={{fontSize:"16px",paddingRight:"80px"}}>
                <ol type="1">
                    <li>The information, as given above is true to the best of my knowledge and belief; and</li>
                    <li>My spouse is not employed in Government service / my spouse is employed in government service and the concession has not been availed of by him/her separately of himself/herself or for any of the family members for the <TextField required id="standard-basic" size='small' label="" variant="standard" style={{width: "100px"}} name='blockyear' value={LTC.blockyear} onChange={inputEventltc}   />block year.</li>
                </ol> 
            </div>
            <div className={styles.sign} style={{fontSize:"16px",paddingRight:"80px"}}>
                <b>Signature of the Applicant with date</b>
            </div>
        </div>
        {
           trig==0
            ?<><Button id = "sub" type="submit" style={{marginLeft:"40vw",marginRight:"40vw",marginBottom:"4vh",background: "DodgerBlue",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}}>Submit</Button>
            <Button id = "sub" onClick={preview} style={{marginLeft:"40vw",marginRight:"40vw",marginBottom:"4vh",background: "#555555",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none"}}>preview</Button></>
            :<><div className="formsubmittext">Your Form is Submitted!! <Button id = "print" style={{background: "rgba(39, 174, 96, .2)",borderRadius: "5px",color:"white",padding: "4px 7px",border:"none",marginLeft:"15px"}} onClick={printdoc}>Print</Button> </div></>
        }
    </form>
    </div>
    )
}
export default Employee;