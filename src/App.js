import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Sidebar from './compenents/Sidebar';
import Admin from './compenents/Admin';
import Organization from './compenents/Organization';
import AddOrganization from './compenents/AddOrganization';
import Login from "./compenents/Login";
import SignUp from "./compenents/Signup";
function App() {
  return (
    <div className="App">
     
    <Router>
       <Sidebar/>
       <div className="routes">
          <Routes>

            <Route exact path="/admins"  element={<Admin/>}/>
            <Route exact path="/organizations"  element={<Organization/>}/>
            <Route exact path="/organizations/add"  element={<AddOrganization/>}/>
            <Route exact path="/organizations/edit/:id"  element={<AddOrganization/>}/>
          </Routes>
          </div>
    </Router>

    </div>
  );
}
export default App;