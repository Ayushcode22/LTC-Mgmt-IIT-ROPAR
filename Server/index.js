const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

// port
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
// To insert application details into employee table
app.post("/",async(req,res)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var rs = "";
    rs = rs.concat("(status:submit,dateTime:", dateTime, ")");
    try {
        const {firstname,lastname,empcode,desg,dept,joindate,bandpay,leaveNature, leaveFrom, leaveTo, leaveNoOfDays, prefixFrom,
            prefixTo, suffixFrom, suffixTo, spouse, selfFrom, selfTo, familyFrom, familyTo, homeTown, natureOfLTC, placeName, 
            estimatedFare, advancedRequired, encashmentRequired, encashmentDays, blockYear, ltcTable,proof}= req.body;
        // console.log(req.body);
        console.log(ltcTable)
        // console.log("Praveen",url)
        // const newEntry=await pool.query ("INSERT INTO employee(proof) VALUES ($1)",[filedata])
        const newEntry = await pool.query("INSERT INTO employee(firstname,lastname,empcode,designation,department,joindate,bandpay,leaveNature, leaveFrom, leaveTo, leaveNoOfDays, prefixFrom, prefixTo, suffixFrom, suffixTo, spouse, selfFrom, selfTo, familyFrom, familyTo, homeTown, natureOfLTC, placeName, estimatedFare, advancedRequired, encashmentRequired, encashmentDays, blockYear, ltcTable, requestStatus,day_date_submitted,proof) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32) RETURNING*",
        [firstname,lastname,empcode,desg,dept,joindate,bandpay,leaveNature, leaveFrom, leaveTo, leaveNoOfDays, prefixFrom,
            prefixTo, suffixFrom, suffixTo, spouse, selfFrom, selfTo, familyFrom, familyTo, homeTown, natureOfLTC, placeName, 
            estimatedFare, advancedRequired, encashmentRequired, encashmentDays, blockYear, ltcTable, rs,dateTime,proof]);
        res.json(newEntry)
    } catch (err) {
        // console.error("pk",err.message);
    }
})


app.post("/HOD_Approval:reqid",async(req,res)=>{
    const {reqid,comment}=req.body
    var query ="Update employee set hod='Approved',hod_comment=$1 where requestid=$2"
    const update=await pool.query(query,[comment,reqid])
  
})
app.post("/ja_Approval",async(req,res)=>{
    const {reqid}=req.body
    console.log(reqid,"Ayush")
    var query ="Update employee set jr_assistant='Approved' where requestid=$1"
    const update=await pool.query(query,[reqid])
  
})

app.post("/establishment",async(req,res)=>{
    try {
        const{reqid,date,comment,empcode}=req.body
        const newEntry = await pool.query("INSERT into est_sec(reqid,submitdate,empcode) values($1,$2,$3) RETURNING*",
        [reqid,date,empcode]);
        const c_update=await pool.query("update employee set jr_assistant_comment=$1 where requestid=$2",[comment,reqid]);
    } catch (error) {
    }
})

app.post("/establishment_update",async(req,res)=>{
    try {
        const{
       
        joining,
        block_year,
        nature_ltc_last,
        nature_ltc_current,
        per_from_last,
        per_to_last,
        per_from_current,
        per_to_current,
        ltc_sf_last,
        ltc_sf_current,
        encash_last,
        encash_current,
        credit,
        credit_last,
        credit_current,
        balance_last,
        balance_current,
        admiss_last,
        admiss_current,
        sac_per_from_last,
        sac_per_to_last,
        sac_nature_last,
        sac_per_from_current,
        sac_per_to_current,
        sac_nature_current,
        reqid  
    }=req.body
    
        // var qry = "Insert into est_sec(joining,blockYear,nature_ltc_last,nature_ltc_current,per_from_last,per_to_last,per_from_current,per_to_current,ltc_sf_last,ltc_sf_current,encash_last,encash_current,credit,credit_last,credit_current,balance_last,balance_current,admiss_last,admiss_current,sac_per_from_last,sac_per_to_last,sac_nature_last,sac_per_from_current,sac_per_to_current,sac_nature_current,reqid) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26) RETURNING*"
        var qry ='UPDATE est_sec set joining=$1,blockyear=$2,nature_ltc_last=$3,nature_ltc_current=$4,per_from_last=$5,per_to_last=$6,per_from_current=$7,per_to_current=$8,ltc_sf_last=$9,ltc_sf_current=$10,encash_last=$11,encash_current=$12,credit=$13,credit_last=$14,credit_current=$15,balance_last=$16,balance_current=$17,admiss_last=$18,admiss_current=$19,sac_per_from_last=$20,sac_per_to_last=$21,sac_nature_last=$22,sac_per_from_current=$23,sac_per_to_current=$24,sac_nature_current=$25 where reqid =$26 '
        const newEntry = await pool.query(qry,
        [
            joining,
            block_year,
            nature_ltc_last,
            nature_ltc_current,
            per_from_last,
            per_to_last,
            per_from_current,
            per_to_current,
            ltc_sf_last,
            ltc_sf_current,
            encash_last,
            encash_current,
            credit,
            credit_last,
            credit_current,
            balance_last,
            balance_current,
            admiss_last,
            admiss_current,
            sac_per_from_last,
            sac_per_to_last,
            sac_nature_last,
            sac_per_from_current,
            sac_per_to_current,
            sac_nature_current,
            reqid
        
    ]);
    var query ="Update employee set jr_assistant='Approved' where requestid=$1"
    const update=await pool.query(query,[reqid])
    console.log(newEntry)
    } catch (error) {
        console.log(error)
        
    }
})


// used is previous application of user to get emp code from uid
app.get("/getecode/:uid",async(req,res)=>{
    try {
        const{uid}=req.params;
        console.log(uid)
        const data = await pool.query("SELECT empcode,joining_date from Roles where uid=$1",[uid]);
       //  const {empcode} = await data.rows[0];
       //  console.log(empcode)
        res.json(await data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_joining_date/:ecode",async(req,res)=>{
   try {
       const{ecode}=req.params;
       const data = await pool.query("SELECT joining_date from Roles where empcode=$1 limit 1",[ecode]);
      //  const {empcode} = await data.rows[0];
      //  console.log(empcode)
       res.json(await data.rows[0])
   } catch (err) {
       console.error(err.message)
   }
})

app.get("/get_emp_applications/:emp/:dept",async(req,res)=>{
    try {
        const{emp,dept}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT * from employee where empcode=$1 and department=$2",[emp,dept]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_jr_asst/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_assistant is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_emp_prev_applications/:emp/:dept",async(req,res)=>{
    try {
        const{emp,dept}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT * from employee where empcode=$1 and department=$2",[emp,dept]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_jr_asst/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_assistant is null  and hod ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_new_emp_applications_asstauditofficer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and asst_audit_officer is null  and asst_registrar ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_new_emp_applications_audit_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and audit_officer is null  and asst_audit_officer ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_new_emp_applications_senior/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and sr_audit_officer is null  and audit_officer ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_jr_acc/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_acc is null  and sr_audit_officer ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_main_registrar/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and registrar is not null ",[emp]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_jr_acc_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_acc_officer is null  and jr_acc ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_jr_acc_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_acc_officer is null  and jr_acc ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_new_emp_applications_dean/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and dean is null  and registrar ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_dean/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and dean is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_main_registrar/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and registrar is null  and deputy_registrar ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_acc_deputy_registrar/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and acc_deputy_registrar is null  and acc_asst_registrar ='Approved'",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_jr_acc/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_acc is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_jr_acc_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_acc_officer is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_acc_asst_registrar/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and acc_asst_registrar is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_acc_deputy_registrar/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and acc_deputy_registrar is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.get("/get_prev_emp_applications_jr_superintendent/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_superintendent is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_prev_emp_applications_asst_audit_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and asst_audit_officer is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_prev_emp_applications_audit_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and audit_officer is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_prev_emp_applications_sr_audit_officer/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and sr_audit_officer is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_new_emp_applications_jr_superintendent/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and jr_superintendent is null and jr_assistant ='Approved'  ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_emp_applications_asst_reg/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and asst_registrar is not null ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_emp_applications_asst_reg/:emp",async(req,res)=>{
    try {
        const{emp}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted from employee where empcode=$1 and asst_registrar is null and jr_superintendent='Approved' ",[emp]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.get("/makecopy_data/:reqId",async(req,res)=>{
    try {
        const{reqId}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT * from employee where requestid=$1 ",[reqId]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/makecopy_table_data/:reqId",async(req,res)=>{
    try {
        const{reqId}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT ltctable from employee where requestid=$1 ",[reqId]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows[0].ltctable)
    } catch (err) {
        console.error(err.message)
    }
})
// To get table data of family members from database
app.get("/gettabledata/:id",async(req,res)=>{
    try {
        console.log("hello2")
        const{id}=req.params;
        console.log(id)
        const data = await pool.query("SELECT ltctable from employee where requestid=$1",[id]);
        res.json(data.rows[0].ltctable)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getdept/:uid",async(req,res)=>{
    try {
        const{uid}=req.params;
        console.log(uid)
        const data = await pool.query("SELECT department from Roles where uid=$1",[uid]);
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_jrasst/",async(req,res)=>{
    try {
        // const{uid}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT requestid,empcode,day_date_submitted,dean from employee where  jr_assistant is not null");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/Create_Role/",async(req,res)=>{
    try {
        const{Email,Role,Designation,Department,Emp_Code,F_id,First_Name,Last_Name,Band_Pay,joindate}=req.body;
        
        const data = await pool.query("insert into roles values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[Email,Role,Emp_Code,Designation,Department,F_id,First_Name,Last_Name,Band_Pay,joindate]);
        
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/gethodapprovedjasst/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where jr_assistant='Approved' and jr_superintendent is NULL");
        console.log("HUVUYVUBJHJGJUYGJHBVU")
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new_registrar/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where deputy_registrar='Approved' and registrar is NULL");
        console.log("HUVUYVUBJHJGJUYGJHBVU")
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_main_registrar/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where  registrar is Not NULL");
        console.log("HUVUYVUBJHJGJUYGJHBVU")
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_asst_reg/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where asst_registrar is not NULL");
        console.log("HUVUYVUBJHJGJUYGJHBVU")
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/auto_populate/:uid",async(req,res)=>{
    try {
        const {uid}=req.params
        console.log("PK")
        const data = await pool.query("SELECT first_name,last_name,department,designation,empcode,band_pay,joining_date from roles where uid=$1",[uid]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getappestapp/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from est_sec where asst_reg=true");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/gethodapprovedjspr/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where jr_superintendent='Approved' and asst_registrar is NULL ");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.get("/getprevious_audit/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where asst_registrar='Approved' and asst_audit_officer is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_audit_officer/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where asst_audit_officer='Approved' and audit_officer is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_jr_acc/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where sr_audit_officer='Approved' and jr_acc is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getprevious_jr_acc_officer/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where jr_acc='Approved' and jr_acc_officer is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_acc_asst_registrar/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where jr_acc_officer='Approved' and acc_asst_registrar is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_acc_deputy_registrar/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where acc_asst_registrar='Approved' and deputy_registrar is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_application_jr_acc/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where sr_audit_officer='Approved' and jr_acc is  NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_application_jr_acc_officer/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where jr_acc='Approved' and jr_acc_officer is  NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_application_acc_asst_registrar/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where jr_acc_officer='Approved' and acc_asst_registrar is  NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_application_acc_deputy_registrar/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where acc_asst_registrar='Approved' and deputy_registrar is  NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/getprevious_sr_officer/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where audit_officer='Approved' and sr_audit_officer is not NULL ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getprevious_jr_spr/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * from employee where jr_superintendent is not null ");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/j_spr_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set jr_superintendent ='Approved' ,jr_superintendent_comment =$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/main_registrar_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set registrar ='Approved',registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/main_registrar_revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set registrar ='Rejected',registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/jr_acc_update/",async(req,res)=>{
    try {
        console.log("MAMAMAMA")
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set jr_acc ='Approved',jr_acc_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/jr_acc_revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set jr_acc ='Rejected',jr_acc_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/jr_acc_officer_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set jr_acc_officer ='Approved',jr_acc_officer_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/jr_acc_officer_revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set jr_acc_officer ='Rejected',jr_acc_officer_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/jr_acc_officer_update/",async(req,res)=>{
    try {
        
        const {reqid}= req.body
        const data = await pool.query("Update employee set jr_acc_officer ='Approved' where requestid = $1",[reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/insert_acc/",async(req,res)=>{
    try {
        
        const {rows,total,advanced,passed,words,debit,reqid}= req.body
        const data = await pool.query("Insert into acc_table values($1,$2,$3,$4,$5,$6,$7)",[reqid,rows,total,advanced,passed,words,debit]);
        //const r = await pool.query("Update employee set jr_acc='Approved', ") 
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/acc_asst_registrar_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set acc_asst_registrar ='Approved',acc_asst_registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/acc_deputy_registrar_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set deputy_registrar ='Approved',deputy_registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/acc_deputy_registrar_revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set deputy_registrar ='Rejected',deputy_registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/acc_asst_registrar_revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set acc_asst_registrar ='Rejected',acc_asst_registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/acc_deputy_registrar_revert/",async(req,res)=>{
    try {
        
        const {reqid}= req.body
        const data = await pool.query("Update employee set deputy_registrar ='Approved' where requestid = $1",[reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/audit0_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set asst_audit_officer ='Approved' ,asst_audit_officer_comment = $1  where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/asst_audit_officer_Revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set asst_audit_officer ='Rejected' ,asst_audit_officer_comment = $1  where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/audit_officer_Revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set audit_officer ='Rejected' ,audit_officer_comment = $1  where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/audit1_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set audit_officer ='Approved', audit_officer_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/audit2_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set sr_audit_officer ='Approved',sr_audit_officer_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/sr_audit_officer_Revert/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("OKOKOKO")
        console.log(reqid)
        const data = await pool.query("Update employee set sr_audit_officer ='Rejected',sr_audit_officer_comment=$1 where requestid = $2",[comment,reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/asst_reg_update/",async(req,res)=>{
    try {
        
        const {reqid,comment}= req.body
        console.log("PRAVEEN SAINI")
        console.log("AYUSH",reqid)
        const data = await pool.query("Update employee set asst_registrar='Approved' , asst_registrar_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/dean_update/",async(req,res)=>{
    try {
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set dean='Approved',dean_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
        const data1 = await pool.query("Update est_sec set application_status='Approved' where reqid = $1",[reqid]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/dean_revert/",async(req,res)=>{
    try {
        const {reqid,comment}= req.body
        const data = await pool.query("Update employee set dean='Rejected',dean_comment=$1 where requestid = $2",[comment,reqid]);
        // res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// To get previous application of user
app.get("/getprevious/:ecode",async(req,res)=>{
    try {
        const {ecode} = req.params; 
        const data = await pool.query("SELECT requestid,day_date_submitted,hod, jr_assistant from employee where empcode = $1 ",[ecode]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_link/:reqId",async(req,res)=>{
    try {
        const {reqId} = req.params; 
        const data = await pool.query("SELECT proof from employee where requestid = $1 ",[reqId]);
        res.json(data.rows[0].proof)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/check_acc/:reqId",async(req,res)=>{
    try {
        const {reqId} = req.params; 
        const data = await pool.query("SELECT jr_acc from employee where requestid = $1 ",[reqId]);
        res.json(data.rows[0].jr_acc);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getaccountsdata/:reqId",async(req,res)=>{
    try {
        const {reqId} = req.params; 
        const data = await pool.query("SELECT total,advanced,passed,words,debit from acc_table where requestid = $1 ",[reqId]);
        res.json(data.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getaccounts_tabledata/:reqId",async(req,res)=>{
    try {
        const {reqId} = req.params; 
        const data = await pool.query("SELECT table_data from acc_table where requestid = $1 ",[reqId]);
        res.json(data.rows[0].table_data);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getauditcomment/:reqid",async(req,res)=>{
    try {
        const {reqid} = req.params; 
        const data = await pool.query("Select asst_audit_officer_comment, audit_officer_comment,sr_audit_officer_comment from employee where requestid= $1 ",[reqid]);
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/name/:uid",async(req,res)=>{
    try {
        const {uid} = req.params; 
        console.log("PRAVEEN")
        const data = await pool.query("SELECT first_name,last_name from roles where uid= $1 ",[uid]);
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/last_ltc/:empcode",async(req,res)=>{
    try {
        const{empcode}=req.params;
        // console.log(uid)
        const data = await pool.query("SELECT * from est_sec where empcode=$1 and application_status='Approved' order by reqid desc limit 1;",[empcode]);
        // const {empcode} = data.rows[0];
        // console.log(empcode)
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.get("/get_application_asst_audit_officer/",async(req,res)=>{
    try {
        // const {ecode} = req.params; 
        const response = await pool.query("SELECT requestid,day_date_submitted,empcode from employee where asst_registrar ='Approved' and asst_audit_officer is null");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_application_audit_officer/",async(req,res)=>{
    try {
        // const {ecode} = req.params; 
        const response = await pool.query("SELECT requestid,day_date_submitted,empcode from employee where asst_audit_officer ='Approved' and audit_officer is null");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})
//
app.get("/get_application_sr_audit_officer/",async(req,res)=>{
    try {
        // const {ecode} = req.params; 
        const response = await pool.query("SELECT requestid,day_date_submitted,empcode from employee where audit_officer ='Approved' and sr_audit_officer is null");
        res.json(response.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getrole/:ema",async(req,res)=>{
    try {
        const{ema} = req.params;
        console.log(ema)
        const data = await pool.query("SELECT user_type from Roles where email=$1",[ema]);
        const {user_type} =data.rows[0]
        console.log(user_type)
        res.json(user_type)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getusertype/:uid",async(req,res)=>{
    try {
        const{uid} = req.params;
        console.log(uid)
        const data = await pool.query("SELECT user_type from Roles where uid =$1",[uid]);
         const {user_type} =data.rows[0]
         console.log(user_type)
        res.json(user_type)
    } catch (err) {
        console.error("eiwgigiwigw3",err.message)
    }
})

app.get("/getestabdata/:reqid",async(req,res)=>{
    try {
        console.log("hello3")
        const{reqid} = req.params;
        console.log(reqid,"OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKK")
        const data = await pool.query("SELECT joining,blockyear,nature_ltc_last,nature_ltc_current,per_from_last,per_to_last,per_from_current,per_to_current,ltc_sf_current,ltc_sf_last,encash_last,encash_current,credit,credit_last,credit_current,balance_last,balance_current,admiss_last,admiss_current,sac_per_from_last,sac_per_to_last,sac_nature_last,sac_per_from_current,sac_per_to_current,sac_nature_current from est_sec where reqid =$1",[reqid]);
        // const {user_type} =data.rows[0]
        // console.log(user_type)
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getapplications/:dept",async(req,res)=>{
    try {
        const{dept} = req.params;

        const data = await pool.query("SELECT requestid,firstname,day_date_submitted,hod,empcode from employee where department=$1 and hod is null",[dept]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getapplications_audit/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT requestid,firstname,day_date_submitted from employee where asst_registrar='Approved' and asst_audit_officer is null");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_new",async(req,res)=>{
    try {
        

        const data = await pool.query("SELECT requestid,firstname,day_date_submitted,hod from employee where registrar='Approved' and dean is null");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_prev_app",async(req,res)=>{
    try {
        

        const data = await pool.query("SELECT requestid,firstname,day_date_submitted,hod from employee where dean is not null");
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/viewApplication/:reqid",async(req,res)=>{
    try {
        console.log("hello1")
        const{reqid} = req.params;

        const data = await pool.query("SELECT firstname,lastname,empcode,designation,department,joindate,bandpay,leavenature,leavefrom,leaveto,leavenoofdays,prefixfrom,prefixto,suffixfrom,suffixto,spouse,selffrom,selfto,familyfrom,familyto,hometown,natureofltc,placename,estimatedfare,advancedrequired,encashmentrequired,encashmentdays,blockyear from employee where requestid=$1",[reqid]);
        res.json(data.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/Dean_Approval/:reqid",async(req,res)=>{
    try {
        const{reqid} = req.params;
        console.log("AYUSH")
        const data = await pool.query("update employee set dean='Approved' where requestid=$1",[reqid]);
        
    } catch (err) {
        console.error(err.message)
    }
})
app.post("/HOD_Revert/",async(req,res)=>{
    try {
        const{reqid,comment} = req.body;
        console.log(reqid,comment)
        console.log("AYUSH")
        const data = await pool.query("update employee set hod='Rejected' , hod_comment=$1 where requestid=$2",[comment,reqid]);
        
    } catch (err) {
        console.error("PL",err.message)
    }
})
app.post("/asst_registrar_Revert/",async(req,res)=>{
    try {
        const{reqid,comment} = req.body;
        console.log(reqid,comment)
        console.log("AYUSH")
        const data = await pool.query("update employee set asst_registrar='Rejected' , asst_registrar_comment=$1 where requestid=$2",[comment,reqid]);
        
    } catch (err) {
        console.error("PL",err.message)
    }
})
app.post("/superintendent_Revert/",async(req,res)=>{
    try {
        const{reqid,comment} = req.body;
        console.log(reqid,comment)
        console.log("AYUSH")
        const data = await pool.query("update employee set jr_superintendent='Rejected' , jr_superintendent_comment=$1 where requestid=$2",[comment,reqid]);
        
    } catch (err) {
        console.error("PL",err.message)
    }
})
app.post("/establishment_Revert/",async(req,res)=>{
    try {
        const{reqid,comment} = req.body;
        console.log(reqid,comment)
        console.log("AYUSH")
        const data = await pool.query("update employee set jr_assistant='Rejected' , jr_assistant_comment=$1 where requestid=$2",[comment,reqid]);
        
    } catch (err) {
        console.error("PL",err.message)
    }
})
app.get("/get_prev_applications/:dept",async(req,res)=>{
    try {
        const{dept} = req.params;

        const data = await pool.query("SELECT requestid,firstname,day_date_submitted,hod,empcode from employee where department=$1 and hod is not null",[dept]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})
app.get("/get_verdict/:reqid",async(req,res)=>{
    try {
        const{reqid} = req.params;

        const data = await pool.query("SELECT hod,jr_assistant,jr_superintendent,asst_registrar,asst_audit_officer,audit_officer,sr_audit_officer,jr_acc,jr_acc_officer,acc_asst_registrar,deputy_registrar,registrar,dean from employee where requestid=$1",[reqid]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/get_comments/:reqid",async(req,res)=>{
    try {
        const{reqid} = req.params;

        const data = await pool.query("SELECT hod_comment,jr_assistant_comment,jr_superintendent_comment,asst_registrar_comment,asst_audit_officer_comment,audit_officer_comment,sr_audit_officer_comment,jr_acc_comment,jr_acc_officer_comment,acc_asst_registrar_comment,deputy_registrar_comment,registrar_comment,dean_comment from employee where requestid=$1",[reqid]);
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/gethodapprovedapp/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * from employee where hod ='Approved' and jr_assistant is NULL" );
        res.json(data.rows)
        console.log(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// Don't touch this.

app.listen(PORT,(()=>{
    console.log(`Running on port ${PORT}`);
}))

