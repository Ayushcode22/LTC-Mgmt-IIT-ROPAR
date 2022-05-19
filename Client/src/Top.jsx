import React from "react";
function Top (){
    return (
        <>
        <div className="header" style={{display:"flex",columnGap:"6%",fontFamily:"sans-serif",background: "rgb(70,70,70)",background: "linear-gradient(180deg, rgba(151,188,246,1) 0%, rgba(200,216,228,1) 100%)",padding:"10px 0 10px 25px"}}>
            <div style={{display:"flex",columnGap:"30px"}} ><img id= "img" src={'https://www.iitrpr.ac.in/sites/default/files/image.jpg'} style = {{width:"90px",height:"90px"}}/>
            <div className="header_name" style={{display: "flex",flexDirection: "column",fontWeight:"700",color:"#243665"}}>
                <p style={{marginBottom: "0",fontSize:"20px"}}>भारतीय प्रौद्योगिकी संस्थान रोपड</p>
                <p style={{marginTop: "15px",fontSize:"20px"}}>INDIAN INSTITUTE OF TECHNOLOGY, ROPAR</p>
            </div></div>
            <p style={{fontSize: "60px",fontWeight: "700",marginTop:"20px",marginBottom:"0",color:"#243665",textDecoration:"underline"}}>LTC Portal</p>
        </div>
        <hr style={{margin:"0",height:"1px",borderWidth:"0",color:"black",backgroundColor:"black"}}></hr></>
    );
}
export default Top;