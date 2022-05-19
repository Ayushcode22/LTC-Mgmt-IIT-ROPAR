import React from 'react'
import LoginBox from "./Components/Loginbox"
import RegisterBox from "./Components/Registerbox"
import ForgotPassBox from './Components/ForgotPassBox';
import NewAppl from "./Components/NewApplication"
import PreviousApp from "./Components/PreviousApp"
import Estform2 from "./Components/Estform2"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserPage from "./Components/UserPage"
import HomePage from './Components/HomePage';
import AdminPage from './Components/AdminPage';
import AdminPrevious from './Components/AdminPrevious';
import AdminNewApp from './Components/AdminNewApp';
import Form from './Components/AdminViewApplication';
import EstPage from './Components/EstPage';
import EstPrevious from './Components/EstPrevious';
import Estnew from './Components/Estnew';
import EstForm1 from './Components/EstForm1'
import DeanNew from './Components/DeanNew';
import DeanPrevious from './Components/DeanPrevious';
import DeanPage from './Components/DeanPage';
import DeanCreate_Role from './Components/DeanCreate_Role';
import AuditPage from './Components/AuditPage';
import AuditNew from './Components/AuditNew';
import AuditPrevious from './Components/AuditPrevious';
import AccountNew from './Components/AccountNew';
import AccountsPage from './Components/AccountsPage';
import AccountsPrevious from './Components/AccountsPrevious';
import RegistrarPrevious from './Components/RegistrarPrevious';
import RegistrarNew from './Components/RegistrarNew';
import RegistrarPage from './Components/RegistrarPage';
import Form3 from './Components/Form3';
import Form4 from './Components/Form4';
import ViewAppForm4 from './Components/ViewAppForm4';
import AuthProvider from './Auth';

function App() {

  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
        <Route  path="/" element={<LoginBox/>}/>
        <Route  path="/register" element={<RegisterBox />}/>
        <Route  path="/forgotpassword" element={<ForgotPassBox />}/>
        
        <Route  path="/userpage/:id/" element={<UserPage/>}>
          <Route  path="home" element={<HomePage/>}/>
          <Route  path="newApplication/:reqId" element={<NewAppl/>}/>
          <Route  path="previousApplication" element={<PreviousApp/>}/>
        </Route>

        <Route  path="/adminpage/:id/" element={<AdminPage/>}>
          <Route  path="home" element={<AdminPage/>}/>
          <Route  path="previous" element={<AdminPrevious/>}/>
          <Route  path="new" element={<AdminNewApp/>}/>
        </Route>


        <Route  path="/estabpage/:id/" element={<EstPage/>}>
          <Route  path="home" element={<EstPage/>}/>
          <Route  path="previous" element={<EstPrevious/>}/>
          <Route  path="new" element={<Estnew/>}/>
        </Route>

        <Route  path="/auditpage/:id/" element={<AuditPage/>}>
          <Route  path="home" element={<AuditPage/>}/>
          <Route  path="previous" element={<AuditPrevious/>}/>
          <Route  path="new" element={<AuditNew/>}/>
        </Route>

        <Route  path="/deanpage/:id/" element={<DeanPage/>}>
          <Route  path="home" element={<DeanPage/>}/>
          <Route  path="previous" element={<DeanPrevious/>}/>
          <Route  path="new" element={<DeanNew/>}/>
          <Route path="create_role" element={<DeanCreate_Role/>}/>
        </Route>

        <Route  path="/accountspage/:id/" element={<AccountsPage/>}>
          <Route  path="home" element={<AccountsPage/>}/>
          <Route  path="previous" element={<AccountsPrevious/>}/>
          <Route  path="new" element={<AccountNew/>}/>
          
        </Route>

        <Route  path="/registrarpage/:id/" element={<RegistrarPage/>}>
          <Route  path="home" element={<RegistrarPage/>}/>
          <Route  path="previous" element={<RegistrarPrevious/>}/>
          <Route  path="new" element={<RegistrarNew/>}/>
          
        </Route>



        <Route  path="/application/:reqid/:uid/:flag/:empcode" element={<Form/>}/>
        <Route  path="/EstForm1/:reqid/:uid/:ecode" element={<EstForm1/>}/>
        <Route  path="/EstForm2/:reqid/:uid/:flag" element={<Estform2/>}/>
        <Route  path="/Form3/:reqid/:uid/:flag" element={<Form3/>}/>
        <Route  path="/Form4/:reqid/:uid/:flag" element={<Form4/>}/>
        <Route  path="/viewForm4/:reqid/:uid/:flag" element={<ViewAppForm4/>}/>

      </Routes>
    </Router></AuthProvider>
    </>
  );
}

export default App;
