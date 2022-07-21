import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Sidebar from './compenents/Sidebar';
import Admin from './compenents/Admin';
import Organization from './compenents/Organization';
import Admins from "./compenents/Admins";
import AddOrganization from './compenents/AddOrganization';
import AddAdmin from "./compenents/AddAdmin";
import AssignAdmin from "./compenents/AssignAdmin";
import Login from "./compenents/Login";
import SignUp from "./compenents/Signup";
function App() {
  return (
    <div className="App">
     
    <Router>
       <Sidebar/>
       <div className="routes">
          <Routes>

            <Route exact path="/admins"  element={<Admins/>}/>
              <Route exact path="/organizations"  element={<Organization/>}/>
            <Route exact path="/organizations/add"  element={<AddOrganization/>}/>
              <Route exact path="/organizations/assign"  element={<AssignAdmin/>}/>
            <Route exact path="/organizations/edit/:id"  element={<AddOrganization/>}/>
              <Route exact path="/admins/add"  element={<AddAdmin/>}/>
              <Route exact path="/admins/edit/:id"  element={<AddAdmin/>}/>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/sign-in" element={<Login />} />
              <Route  exact path="/sign-up" element={<SignUp />} />
          </Routes>
          </div>
    </Router>

    </div>
  );
}
export default App;