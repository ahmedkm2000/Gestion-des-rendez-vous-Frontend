import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Organization from './compenents/Organization';
import Admins from "./compenents/Admins";
import AddOrganization from './compenents/AddOrganization';
import AddAdmin from "./compenents/AddAdmin";
import AssignAdmin from "./compenents/AssignAdmin";
import Login from "./compenents/Login";
import Logout from "./compenents/Logout";
import AdminPage from "./compenents/AdminPage";
import SignUp from "./compenents/Signup";
import {SidebarAdminData} from "./compenents/SidebarData";
import {AuthProvider} from "./compenents/Auth";
import {RequireAuth} from "./compenents/RequireAuth";
import OrganizationList from "./compenents/OrganizationList";
import Roles from "./compenents/Roles";
function App() {
  return (
      <AuthProvider>
    <div className="App">
    <Router>

       <div className="routes">
          <Routes>
              <Route exact path="/register"  element={<SignUp/>}/>
              <Route exact path="/login"  element={<Login/>}/>
              <Route exact path="/logout"  element={<Logout/>}/>
              <Route exact path="/organizations"  element={<RequireAuth><Organization/></RequireAuth>}/>
              <Route exact path="/organizations/all"  element={<RequireAuth><OrganizationList/></RequireAuth>}/>
              <Route exact path="/organizations/all/:id"  element={<RequireAuth><AdminPage/></RequireAuth>}/>
              <Route exact path="/organizations/:id/users"  element={<RequireAuth><Admins/></RequireAuth>}/>
              <Route exact path="/users/:id/organizations"  element={<RequireAuth><Organization/></RequireAuth>}/>
              <Route exact path="/organizations/all/:id/admins"  element={<RequireAuth><Admins/></RequireAuth>}/>
              <Route exact path="/users/:id/roles/:idRole" element={<RequireAuth><Roles/></RequireAuth>}/>
              <Route exact path="/organizations/:id/assign/:idu"  element={<RequireAuth><Admins/></RequireAuth>}/>
              <Route exact path="/organizations/add"  element={<RequireAuth><AddOrganization/></RequireAuth>}/>
              <Route exact path="/organizations/assign"  element={<RequireAuth><AssignAdmin/></RequireAuth>}/>
              <Route exact path="/organizations/assign/:id"  element={<RequireAuth><AssignAdmin/></RequireAuth>}/>
              <Route exact path="/organizations/edit/:id"  element={<RequireAuth><AddOrganization/></RequireAuth>}/>
              <Route exact path="/admins"  element={<RequireAuth><Admins/></RequireAuth>}/>
              <Route exact path="/admins/add"  element={<RequireAuth><AddAdmin/></RequireAuth>}/>
              <Route exact path="/admins/edit/:id"  element={<RequireAuth><AddAdmin/></RequireAuth>}/>
          </Routes>
          </div>
    </Router>
    </div>
      </AuthProvider>
  );
}
export default App;