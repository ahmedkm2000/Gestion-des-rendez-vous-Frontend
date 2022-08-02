import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar";
import PopupRoles from "./PopupRoles";
import PopupAssignOrg from "./PopupAssignOrg";
import OrganizationService from '../services/OrganizationService.js';
import {SidebarData} from "./SidebarData";
import UserService from "../services/UserService";
import {DataTable} from "./DataTable";
export default function Organization(){
    const [forRole, setIsForRole] = useState(false);
    const [forOrg, setIsForOrg] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [organizations,setOrganizations] = useState([]);
    const [nameUser,setNameUser] = useState([]);
    const [emailUser,setEmailUser] = useState([]);
    const [organization,setOrganization] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const togglePopupRole = (id) => {setIsOpen(!isOpen);setIsForRole(true);setIsForOrg(false);setOrganization(id)}
    const togglePopupOrg = () => {setIsOpen(!isOpen);setIsForRole(false);setIsForOrg(true);}
    const Styles = {
        tables:{
            paddingLeft: "300px",
            paddingTop: "30px",
            maxWidth:"1500px",
            textAlign:"center"
        },
        border:{
            border:"1px solid gray",
        },
        thead:{
            backgroundColor:"fff",
            textAlign:"center"
        },
        button:{
            maxWidth:"50px",
        },
        buttonAdd:{
            marginTop:"20px",
            marginLeft: "94.5%",
            width:"50px",
            borderRadius:"10px"
        },
        infoUser:{
            marginTop:"20px",
            marginLeft: "20%",
        }
    }

    useEffect(()=>{
        if(id!=undefined){
            UserService.getUserById(id).then((res)=>{
                setNameUser(res.data.firstName+" "+res.data.lastName);
                setEmailUser(res.data.email)
                var TempOrg = [];
                var TempRoles ;
                for(let i = 0 ; i < res.data.organizations.length ; i++){
                    TempRoles="";
                    TempOrg.push({
                        _id:res.data.organizations[i].organization._id,
                        name:res.data.organizations[i].organization.name,
                        description:res.data.organizations[i].organization.description,
                        adresse:res.data.organizations[i].organization.adresse,
                    })
                    for(let j = 0 ; j < res.data.organizations[i].roles.length ; j++){
                        TempRoles = TempRoles.concat(" "+ res.data.organizations[i].roles[j].name)
                        TempOrg[i].roles = TempRoles
                    }
                }
                setOrganizations(TempOrg)
            })

        }else {
            OrganizationService.getAllOrganizations().then((res)=>{
               // setOrganizations((res.data).filter((organization)=> organization.isActive!=false));
                setOrganizations(res.data)
            })
        }
        DataTable();

     let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Organization has been added successufely !', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        if (notification==="updated"){
            toast.success('Organization has been updated successufely !', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        localStorage.setItem("notification",null);
    },[])

    function updateOrganization(idOrg){
        if(id===undefined){
        navigate(`/organizations/edit/${idOrg}`);
        }else {
            togglePopupRole(idOrg)
        }
    }


    function deleteOrganization(idOrg){
        confirmAlert({
            title: 'Confirm to detach',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if(id ===undefined){
                        OrganizationService.getOrganizationById(idOrg).then((res)=>{
                            const organizationSchema = res.data
                            organizationSchema.isActive = false;
                            OrganizationService.updateOrganization(res.data._id,organizationSchema).then((res)=>{
                                setOrganizations(organizations.filter((organization)=> organization._id!=idOrg))
                                navigate('/organizations');
                            })
                        })}else{
                            UserService.getUserById(id).then((res)=>{
                                 var userShema = res.data;
                                 var updatedOrganization = res.data.organizations.filter((organization)=>organization.organization._id!=idOrg);
                                 userShema.organizations = updatedOrganization;
                                 UserService.updateUser(id,userShema).then((res)=>{
                                     setOrganizations(organizations.filter((organization)=> organization._id!=idOrg))
                                 })

                            })
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {navigate('/organizations')}
                }
            ]
        });

    }

    function navigateToUsers(id){
        navigate(`/organizations/${id}/users`);
    }

    function navigateToRoles(id,idRole){
        navigate(`/users/${id}/roles/${idRole}`);
    }

    function navigateToAddOrganization(){
        if(id ===undefined){
        navigate('/organizations/add');
        }else{
             togglePopupOrg();
        }
    }


    return(
        <div>
            {isOpen && forRole &&<PopupRoles organization ={organization} handleClose={togglePopupRole}/>}
            {isOpen && forOrg &&<PopupAssignOrg handleClose={togglePopupOrg}/>}
            <Sidebar data={SidebarData}/>
            {id!=undefined?
                <div style={Styles.infoUser}>
                    <h5><u>User's Name : {nameUser}</u></h5>
                    <h5><u>User's Email : {emailUser}</u></h5>
                </div>:""}

            <button style={Styles.buttonAdd} type="button" className="btn btn-outline-primary" onClick={navigateToAddOrganization}>+</button>
    <div style={Styles.tables}>
        <table id="table" style={Styles.border} className="table table-bordered row-border cell-border " >
        <thead style={Styles.thead}>
    <tr>
      <th scope="col">Organization</th>
      <th scope="col">Description</th>
      <th scope="col">Adresse</th>
        {id!=undefined? <th scope="col">Roles</th>:""}
        {id===undefined?<th>Manage Users</th>:""}
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {organizations!=undefined?organizations.map((organization)=>{
   return(
    <tr key={organization._id}>
      <td scope="row">{organization.name}</td>
      <td>{organization.description}</td>
      <td>{organization.adresse}</td>
        {id!=undefined?
            <td>
                {organization.roles}
        </td>:""}
        {id===undefined?
        <td>
            <button type="button" className="btn btn-warning" onClick={()=> navigateToUsers(organization._id)}>View</button>
        </td>:""}
      <td style={Styles.button}>
      <button type="button" className="btn btn-success" onClick={()=> updateOrganization(organization._id)}>Update</button>
      <button type="button" className="btn btn-danger" onClick={()=> deleteOrganization(organization._id)}>Detach</button>

      </td>
    </tr>
          )
        }):""}
  </tbody>
</table>
        </div>   </div>
    
    )
}