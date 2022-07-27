import React,{useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../services/UserService";
import Sidebar from './Sidebar';
import Popup from "./Popup";
import {SidebarData} from "./SidebarData";
import {useParams} from "react-router-dom";
import OrganizationService from "../services/OrganizationService";
import AddAdmin from "./AddAdmin";
import PopupAssignAdmin from "./PopupAssignAdmin";
toast.configure()
export default function Admins(props){
    const [users,setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [forAdd, setIsForAdd] = useState(false);
    const [forAssign, setIsForAssign] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const togglePopupAdd = () => {setIsOpen(!isOpen);setIsForAssign(false);setIsForAdd(true)}
    const togglePopupAssign = () => {setIsOpen(!isOpen);setIsForAssign(true);setIsForAdd(false)}

    useEffect(()=>{
        if(id!=undefined){
         OrganizationService.getOrganizationById(id).then((res)=>{
             setUsers(res.data.users)
         })
        }else {
            UserService.getAllUsers().then((res) => {
                setUsers(res.data)
            })
        }
        let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Admin has been added successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        if (notification==="updated"){
            toast.success('Admin has been updated successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        localStorage.setItem("notification",null);
    },[])
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
            marginLeft: "92.5%",
            borderRadius:"10px"
        },
        buttonPlus:{
            marginTop:"15px",
            marginLeft: "94.5%",
            width:"50px",
            borderRadius:"10px"
        }
    }

    return(
        <div>
            {isOpen && forAdd && <Popup handleClose={togglePopupAdd}/>}
            {isOpen && forAssign &&<PopupAssignAdmin handleClose={togglePopupAdd}/>}
            <Sidebar data={SidebarData}/>
            {id!=undefined?
            <div style={Styles.buttonAdd}>
                <button style={Styles.button} type="button" class="btn btn-outline-warning" onClick={togglePopupAssign} >&</button>
                <button style={Styles.button} type="button" class="btn btn-outline-primary" onClick={togglePopupAdd} >+</button>
            </div>:""}
            <button style={Styles.buttonPlus} type="button" class="btn btn-outline-primary" onClick={navigateToAddAdmin}>+</button>
        <div style={Styles.tables}>
            <table style={Styles.border} class="table table-bordered" >
                <thead style={Styles.thead}>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
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
                            <td style={Styles.button}>
                                <button type="button" class="btn btn-success" onClick={()=> updateAdmin(user._id)}>Update</button>
                                <button type="button" class="btn btn-danger" onClick={()=> deleteAdmin(user._id)}>Delete</button>
                                <button type="button" class="btn btn-warning" onClick={()=> navigateToOrganizations(user._id)}>Organizations</button>
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