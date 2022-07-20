import React,{useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizationService from '../services/OrganizationService.js';
export default function Organization(){
    const [organizations,setOrganizations] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
     OrganizationService.getAllOrganizations().then((res)=>{
         setOrganizations(res.data)
     })
     let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Organization has been added successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        if (notification==="updated"){
            toast.success('Organization has been updated successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        localStorage.setItem("notification",null);
    },[])
    function updateOrganization(id){
        navigate(`/organizations/edit/${id}`)

    }
    function deleteOrganization(id){

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
        }
        }
    
    return(
    <div style={Styles.tables}>
        <table style={Styles.border} class="table table-bordered" >
        <thead style={Styles.thead}>
    <tr>
      <th scope="col">Organization</th>
      <th scope="col">Description</th>
      <th scope="col">Adresse</th>
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
      <td style={Styles.button}>
      <button type="button" class="btn btn-success" onClick={()=> updateOrganization(organization._id)}>Update</button>
      <button type="button" class="btn btn-danger" onClick={()=> deleteOrganization(organization._id)}>Delete</button>
      </td>
    </tr>
          )
        }):""}

   
      
  </tbody>
</table>
        </div>
    
    )
}