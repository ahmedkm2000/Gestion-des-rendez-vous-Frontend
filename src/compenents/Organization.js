import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
import OrganizationService from '../services/OrganizationService.js';
import {SidebarData} from "./SidebarData";
import {useAuth} from "./Auth";
import Sidebar from "./Sidebar";
import UserService from "../services/UserService";
export default function Organization(){
    const [organizations,setOrganizations] = useState([]);
    const [roles,setRoles] = useState([]);
    const navigate = useNavigate();
    const auth = useAuth();
    const {id} = useParams();
    useEffect(()=>{
        if(id!=undefined){
            UserService.getUserById(id).then((res)=>{
                var TempOrg = [];
                for(let i = 0 ; i < res.data.organizations.length ; i++){
                    console.log(res.data.organizations[i])
                    TempOrg.push({
                        _id:res.data.organizations[i].organization._id,
                        name:res.data.organizations[i].organization.name,
                        description:res.data.organizations[i].organization.description,
                        adresse:res.data.organizations[i].organization.adresse,
                        roles:res.data.organizations[i]._id
                    })
                }
                setOrganizations(TempOrg)
            })
            console.log(organizations)
        }else {
            OrganizationService.getAllOrganizations().then((res)=>{
                setOrganizations(res.data)
            })
        }
        /*if (!$.fn.DataTable.isDataTable("#myTable")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#table").DataTable({
                        pagingType: "full_numbers",
                        pageLength: 20,
                        processing: true,
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },

                        buttons: [
                            {
                                extend: "pageLength",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "copy",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "csv",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "print",
                                customize: function (win) {
                                    $(win.document.body).css("font-size", "10pt");
                                    $(win.document.body)
                                        .find("table")
                                        .addClass("compact")
                                        .css("font-size", "inherit");
                                },
                                className: "btn btn-secondary bg-secondary",
                            },
                        ],

                        fnRowCallback: function (
                            nRow,
                            aData,
                            iDisplayIndex,
                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row, meta) {
                                    return type === "export" ? meta.row + 1 : data;
                                },
                            },
                        ],
                    });
                }, 1000);
            });
        }*/
     let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Organization has been added successufely !', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        if (notification==="updated"){
            toast.success('Organization has been updated successufely !', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }
        localStorage.setItem("notification",null);
    },[])
    function updateOrganization(id){
        navigate(`/organizations/edit/${id}`);

    }
    function deleteOrganization(id){

    }
    function navigateToUsers(id){
        navigate(`/organizations/${id}/users`);
    }
    function navigateToRoles(id,idRole){
        navigate(`/users/${id}/roles/${idRole}`);
    }
    function navigateToAddOrganization(){
        navigate('/organizations/add');
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
            marginTop:"20px",
            marginLeft: "94.5%",
            width:"50px",
            borderRadius:"10px"
        }
        }
    
    return(
        <div>
            <Sidebar data={SidebarData}/>
            <button style={Styles.buttonAdd} type="button" class="btn btn-outline-primary" onClick={navigateToAddOrganization}>+</button>
    <div style={Styles.tables}>
        <table id="table" style={Styles.border} class="table table-bordered" >
        <thead style={Styles.thead}>
    <tr>
      <th scope="col">Organization</th>
      <th scope="col">Description</th>
      <th scope="col">Adresse</th>
        <th scope="col">Roles</th>
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
        <td>
            <button type="button" class="btn btn-info" onClick={()=> navigateToRoles(id,organization.roles)}>Roles</button>
        </td>
      <td style={Styles.button}>
      <button type="button" class="btn btn-success" onClick={()=> updateOrganization(organization._id)}>Update</button>
      <button type="button" class="btn btn-danger" onClick={()=> deleteOrganization(organization._id)}>Delete</button>
          <button type="button" class="btn btn-warning" onClick={()=> navigateToUsers(organization._id)}>Manage Users</button>
      </td>
    </tr>
          )
        }):""}

   
      
  </tbody>
</table>
        </div>   </div>
    
    )
}