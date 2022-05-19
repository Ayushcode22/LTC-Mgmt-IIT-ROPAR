import React from 'react';
import Table from 'react-bootstrap/Table';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = ()=>{
  var current = new Date();
  var date = current.getDate() + '-' + (current.getMonth()+1) + '-' + current.getFullYear();
  var dt = date.toString();
  let tb =[
  ]
  let obj = {id: 2, application: "any", date: dt, status: "Pending"}
  tb = [...tb,obj]
  let tb_0 = [
    {id: 1, application: "any", date: "15-01-2022", status: "Approved"},
    {id: 2, application: "any", date: "06-08-2021", status: "Rejected"},
    {id: 3, application: "any", date: "23-07-2020", status: "Approved"}
  ]

  function approve (id){
      tb[id].status = "Approved"
  }
  const filltable = (element, index)=>{
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{element.application}</td>
        <td>{element.date}</td>
        <td>{element.status}</td>
        <td style={{display: "flex",columnGap:"10%"}}><Button variant="success" size="sm">Approve</Button><Button variant="danger" size="sm">Reject</Button></td>
      </tr>
    )
  }
  const fill = (element,index)=>{
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{element.application}</td>
        <td>{element.date}</td>
        <td>{element.status}</td>
      </tr>
    )
  }
  const Show_new = ()=>{
    return (
      <Table striped bordered hover style={{width: "70%",marginLeft:"7.8%"}}>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Application Form</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tb.map(filltable)}
        </tbody>
      </Table>
    );
  }
  const Show_previous = ()=>{
    return (
      <Table striped bordered hover style={{width: "70%",marginLeft:"7.8%"}}>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Application Form</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tb_0.map(fill)}
        </tbody>
      </Table>
    );
  }
  return(
    <Router>
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as = {Link} to = {"/"}>Admin Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as = {Link} to = {"/previous"}>Previous Applications</Nav.Link>
            <Nav.Link as = {Link} to = {"/new"}>New Applications</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    <div>
      <Routes>
        <Route path='/previous' element={<Show_previous/>} />
        <Route path='/new' element={<Show_new/>} />
      </Routes>
    </div>
    </Router>
  );
}
export default App;
