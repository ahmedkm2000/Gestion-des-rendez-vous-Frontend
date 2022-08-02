import React,{useState , useEffect} from "react";
import {useNavigate ,useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import Popup from "./Popup";
import PopupAssignAdmin from "./PopupAssignAdmin";
import UserService from "../services/UserService";
import {SidebarData} from "./SidebarData";
import OrganizationService from "../services/OrganizationService";
import {DataTable} from "./DataTable";
toast.configure()

export default function Admins(props){
    const [users,setUsers] = useState([]);
    const [nameOrganization,setNameOrganization] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [forAdd, setIsForAdd] = useState(false);
    const [forAssign, setIsForAssign] = useState(false);
    var roles = []
    const navigate = useNavigate();
    const {id} = useParams();
    const togglePopupAdd = () => {setIsOpen(!isOpen);setIsForAssign(false);setIsForAdd(true)};
    const togglePopupAssign = () => {setIsOpen(!isOpen);setIsForAssign(true);setIsForAdd(false)};
    const Styles = {
        tables:{
            paddingLeft: "300px",
            paddingTop: "30px",
            maxWidth:"1500px",
            textAlign:"center"
        },
        border:{
            border:"1px solid gray"
        },
        thead:{
            backgroundColor:"fff",
            textAlign:"center"
        },
        button:{
            maxWidth:"50px",
        },
        buttonAdd:{
            display:"flex",
            flexDirection:"rows",
            gap:"20px",
            marginTop:"20px",
            marginLeft: "90%",
            borderRadius:"10px"
        },
        buttonPlus:{
            marginTop:"15px",
            marginLeft: "94.5%",
            width:"50px",
            borderRadius:"10px"
        },
        nameOrg:{
            marginLeft:"20%",
            marginTop:"20px",
        }
    }

    useEffect(()=>{
        if(id!=undefined){
         OrganizationService.getOrganizationById(id).then((res)=>{
             setUsers(res.data.users);
             setNameOrganization(res.data.name);
         });

        }else {
            UserService.getAllUsers().then((res) => {
                setUsers(res.data)
            });
        }
        DataTable();
        let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Admin has been added successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        if (notification==="updated"){
            toast.success('Admin has been updated successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        localStorage.setItem("notification",null);
    },[isOpen])

    function updateAdmin(id){
        navigate(`/admins/edit/${id}`)
    }

    function deleteAdmin(id){

    }

    function navigateToAddAdmin(){
        navigate('/admins/add');
    }

    function navigateToOrganizations(id){
        navigate(`/users/${id}/organizations`);
    }
    return(
        <div>
            {isOpen && forAdd && <Popup handleClose={togglePopupAdd}/>}
            {isOpen && forAssign &&<PopupAssignAdmin handleClose={togglePopupAdd}/>}
            <Sidebar data={SidebarData}/>
            {id!=undefined?
                <div style={Styles.nameOrg}>
                    <h3><u>Organization : {nameOrganization}</u></h3>
            <div style={Styles.buttonAdd}>
                <button style={Styles.button} type="button" class="btn btn-outline-warning" onClick={togglePopupAssign} >&</button>
                <button style={Styles.button} type="button" class="btn btn-outline-primary" onClick={togglePopupAdd} >+</button>
            </div></div>:""}
            {id===undefined?
            <button style={Styles.buttonPlus} type="button" class="btn btn-outline-primary" onClick={navigateToAddAdmin}>+</button>:""}
        <div style={Styles.tables}>
            <table id="table" style={Styles.border} className="table table-bordered row-border cell-border " >
                <thead style={Styles.thead}>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    {id!=undefined?
                    <th scope="col">Roles</th>:""}
                    {id===undefined?
                    <th scope="col">Manage Organizations</th>:""}
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users!=undefined?users.map((user)=>{
                    return(
                        <tr key={user._id}>
                            <td scope="row">{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.adresse}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            {id!=undefined?
                            <td>admin</td>:""}
                            {id===undefined?
                            <td>
                                <button type="button" class="btn btn-warning" onClick={()=> navigateToOrganizations(user._id)}>View</button>
                            </td>:""}
                            <td style={Styles.button}>
                                <button type="button" class="btn btn-success" onClick={()=> updateAdmin(user._id)}>Update</button>
                                <button type="button" class="btn btn-danger" onClick={()=> deleteAdmin(user._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }):""}
                </tbody>
            </table>
        </div>
        </div>

    )
}