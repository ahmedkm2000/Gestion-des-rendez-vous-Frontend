import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import UserService from "../services/UserService";
import OrganizationService from "../services/OrganizationService";
import Sidebar from "./Sidebar";
import {SidebarData} from "./SidebarData";

export default function AssignAdmin(){
    const [admins, setAdmins] = useState([])
    const [organizations, setOrganizations] = useState([]);
    const [selectedAdmin,setSelectedAdmin] = useState();
    const [selectedOrganizations,setSelectedOrganizations] = useState();
    const navigate  = useNavigate();
    const { id } = useParams();
    useEffect(()=>{
        UserService.getAllUsers().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                setAdmins((prev) => [...prev, {
                    value: res.data[i]._id,
                    label: res.data[i].email
                }
                ]);
            }
        })
        OrganizationService.getAllOrganizations().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                setOrganizations((prev) => [...prev, {
                    value: res.data[i]._id,
                    label: res.data[i].name
                }
                ]);
            }
        })

    },[])

    function handleSelectAdmin(data) {
        navigate('/organizations/assign/'+data.value);
        setOrganizations([])
        OrganizationService.getAllOrganizations().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                setOrganizations((prev) => [...prev, {
                    value: res.data[i]._id,
                    label: res.data[i].name
                }
                ]);
            }
        })
        UserService.getUserById(data.value).then((res)=>{

            var idOrgs =[]
            for(let i = 0 ; i <res.data.organizations.length;i++){
                console.log(res.data.organizations[i])
               for(let j = 0 ; j <res.data.organizations[i].roles.length;j++){
                   if(res.data.organizations[i].roles[j].name==="admin"){
                         idOrgs.push(res.data.organizations[i].organization._id)
                   }
               }
                for(let k = 0 ; k <res.data.organizations.length;k++){
                    setOrganizations((organizations) => organizations.filter( organization => organization.value!==idOrgs[k]));

                }

            }
        })
        setSelectedAdmin(data)
    }
    function handleSelectOrganization(data) {
       setSelectedOrganizations(data)
    }
    function addProfessionalToOrganizations(event){
        event.preventDefault();
        event.persist()
        OrganizationService.addAdminToOrganizations(id,selectedOrganizations).then((res)=>{
            localStorage.setItem("notification","added");
            navigate('/admins')
        })
    }
    const Styles = {
        fieldset:{
            border:"1px solid grey",
            borderRadius:"15px",
            width:"40%",
            marginLeft:"38%",
            marginTop:"8%",
            marginBottom:"8%",
            padding:"4%",
            backgroundColor:"white"
        },
        spaces:{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
        }
    }
    return (
        <div>
            <Sidebar data={SidebarData}/>
        <fieldset style= {Styles.fieldset}>
        <form onSubmit={addProfessionalToOrganizations}>
            <h4>list of admins</h4>
            <div style={Styles.spaces} className="dropdown-container">
                <Select
                    options={admins}
                    placeholder="please select an admin"
                    value={selectedAdmin}
                    onChange={handleSelectAdmin}
                    isSearchable={true}

                />
                <h4>list of organizations</h4>
                <Select
                    options={organizations}
                    placeholder="please select an organizations"
                    value={selectedOrganizations}
                    name=""
                    onChange={handleSelectOrganization}
                    isSearchable={true}
                    isMulti
                />
                <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
            </div>
        </form>
        </fieldset>
        </div>
    );
}