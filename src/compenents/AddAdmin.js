import React,{useState,useEffect} from "react";
import {useParams,useNavigate } from 'react-router-dom';
import UserService from "../services/UserService";
import Select from "react-select";
import OrganizationService from "../services/OrganizationService";
import RoleService from "../services/RoleService";
import Sidebar from "./Sidebar";
import {SidebarData} from "./SidebarData";

export default function AddAdmin(){
    const [formData,setFormData] = useState({});
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganizations,setSelectedOrganizations] = useState();
    const [roles, setRoles] = useState([]);
    const [selectedRoles,setSelectedRoles] = useState();
    const [idAdmin,setIdAdmin] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(id!==undefined){
          UserService.getUserById(id).then((res)=>{
              setFormData(res.data);
              const org = []
                  for( let i = 0 ; i < res.data.organizations.length ; i++){
                      org.push({
                          value: res.data.organizations[i].organization._id,
                          label: res.data.organizations[i].organization.name
                      })
              }
              setSelectedOrganizations(org);
            })
        }
        RoleService.getAllRoles().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                setRoles((prev) => [...prev, {
                    value: res.data[i]._id,
                    label: res.data[i].name
                }
                ]);
            }
        });
        RoleService.getRoleByName("admin").then((res)=>{
            setIdAdmin(res.data._id)
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
    const Styles = {
        fieldset:{
            border:"1px solid grey",
            width:"60%",
            marginLeft:"30%",
            marginTop:"4%",
            marginBottom:"8%",
            padding:"4%",
            textAlign:"center",
            backgroundColor:"white"
        }
    }
    function onChange(event){
        event.preventDefault();
        event.persist();
        setFormData(prevState => {
                return{...prevState,
                    [event.target.name]:event.target.value
                }
            }
        )
    }
    function handleSelectOrganization(data) {
        setSelectedOrganizations(data)
    }
    function handleSelectRoles(data) {
        setSelectedRoles(data)
    }
    async function saveAdmin(event){
        event.preventDefault()
        var organizationShema=[] ;
        var TempRoles=[] ;

        for (let i=0; i<selectedRoles.length;i++){
            TempRoles.push(selectedRoles[i].value)
        }
        console.log(TempRoles)
        for (let i=0; i<selectedOrganizations.length;i++){
           organizationShema.push({
                organization:selectedOrganizations[i].value,
                roles:TempRoles
            })
        }
        formData.organizations = organizationShema
        if(formData._id===undefined){
             UserService.createUser(formData).then(()=>{
               UserService.getUserEmail(formData.email).then((res)=>{
                   var ids=[]
                   for (let i=0; i<formData.organizations.length;i++){
                       ids.push(formData.organizations[i].organization)
                   }
                   OrganizationService.addUsersToOrganizations(res.data._id,ids).then(()=>{
                       console.log("success")
                   })
               })
                localStorage.setItem("notification","added");
                navigate('/admins');
            })
        }else {
            UserService.updateUser(formData._id,formData).then(()=>{
                localStorage.setItem("notification","updated");
                navigate('/admins')

            });
        }
    }
    return(
        <div >
            <Sidebar data={SidebarData}/>
            <fieldset style= {Styles.fieldset}>
                <form onSubmit={saveAdmin}>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's First Name"
                               name="firstName"
                               value={formData.firstName}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" id="form4Example2" className="form-control"
                               placeholder="Admin's Last Name"
                               name="lastName"
                               value={formData.lastName}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's Adresse"
                               name="adresse"
                               value={formData.adresse}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="email"  className="form-control"
                               placeholder="Admin's Email"
                               name="email"
                               value={formData.email}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's Phone Number"
                               name="phoneNumber"
                               value={formData.phoneNumber}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                    <Select
                        options={organizations}
                        placeholder="please select  organizations"
                        value={selectedOrganizations}
                        onChange={handleSelectOrganization}
                        isSearchable={true}
                        isMulti
                    />
                    </div>
                    <div className="form-outline mb-4">
                    <Select
                        options={roles}
                        placeholder="please select roles"
                        value={selectedRoles}
                        onChange={handleSelectRoles}
                        isSearchable={true}
                        isMulti
                    />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
                </form>
            </fieldset>
        </div>
    )
}