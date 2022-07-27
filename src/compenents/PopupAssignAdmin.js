import React,{useState , useEffect} from "react";
import '../styles/popup.css';
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../services/UserService";
import OrganizationService from "../services/OrganizationService";
import Sidebar from "./Sidebar";
import {SidebarData} from "./SidebarData";
import Select from "react-select";
import RoleService from "../services/RoleService";
const PopupAssignAdmin = props => {
    const [formData,setFormData] = useState({});
    const [organization, setOrganization] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles,setSelectedRoles] = useState();
    const [users, setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState();
    var TempIdRoles =[];
    var TempRoles= []   
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        OrganizationService.getOrganizationById(id).then((res)=>{
            setOrganization(res.data)
        })
        UserService.getAllUsers().then((res)=>{
            var TempUsers =[]
            for( let i = 0 ; i < res.data.length ; i++){
                TempUsers.push({
                    value: res.data[i]._id,
                    label: res.data[i].email
                })
            }
            setUsers(TempUsers)
        })
    },[])
    const Styles = {
        fieldset:{
            textAlign:"center",

        }
    }
    function handleSelectRoles(data) {
        setSelectedRoles(data)
    }
    async function handleSelectProfessional(data){

         await RoleService.getAllRoles().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                TempRoles.push({
                    value: res.data[i]._id,
                    label: res.data[i].name
                })
            }
        })
        console.log(TempRoles)
        await OrganizationService.getOrganizationById(id).then((res)=>{
            for(let i = 0 ; i <res.data.users.length;i++){
               if(res.data.users[i]._id === data.value){ 
                   UserService.getUserById(data.value).then((res)=>{
                       for(let k = 0 ; k <res.data.organizations.length;k++){
                           if(res.data.organizations[k].organization._id === id){
                               for(let n = 0 ; n <res.data.organizations[k].roles.length;n++){
                                   TempIdRoles.push(res.data.organizations[k].roles[n]._id)

                               }
                                 for(let m = 0 ; m <TempIdRoles.length;m++){
                                     setRoles((roles) => roles.filter( role => role.value!==TempIdRoles[m]));

                                 }
                           }
                       }
                   })
               }  else{
                         setRoles(TempRoles)
               }
                }

            })
            setSelectedUser(data)        
        }

    async function saveAdmin(event){
        var RolesShema =[]
        var OrganizationShema = []
        var exist = false;
        event.preventDefault()
        for (let i=0; i<selectedRoles.length;i++){
            RolesShema.push(selectedRoles[i].value)
        }
        await OrganizationService.getOrganizationById(id).then((res)=>{
            for (let i=0; i<res.data.users.length;i++){
                if (res.data.users[i]._id === selectedUser.value){
                    exist = true;
                    for (let j=0; j<res.data.users[i].organizations.length;j++){
                        if(res.data.users[i].organizations[j].organization === id){
                           var TempRoles = res.data.users[i].organizations[j].roles;
                            for (let k=0; k<selectedRoles.length;k++){
                            TempRoles.push(selectedRoles[k].value)
                            }
                            OrganizationShema.push({
                                organization:res.data.users[i].organizations[j].organization,
                                roles:TempRoles
                            })
                        }else{
                            OrganizationShema.push({
                                organization:res.data.users[i].organizations[j].organization,
                                roles:res.data.users[i].organizations[j].roles
                            })
                        }
                    }
                    UserService.getUserById(selectedUser.value).then((res)=>{
                        var userData = res.data;
                        userData.organizations = OrganizationShema;
                        UserService.updateUser(selectedUser.value,userData).then((res)=>{
                            console.log("success")
                        })
                    })

                }
            }
        })
        if (exist === false){
            OrganizationService.getOrganizationById(id).then((res)=>{
                var organizationData = res.data
                var users = res.data.users;
                users.push(selectedUser.value);
                organizationData.users = users;
                OrganizationService.updateOrganization(id,organizationData).then((res)=>{
                    console.log("added to org")
                })
            })
            UserService.getUserById(selectedUser.value).then((res)=>{
                var TempRoles = []
                var userData = res.data;
                var organizations = res.data.organizations;
                console.log('org')
                console.log(organizations)
                for (let k=0; k<selectedRoles.length;k++){
                    TempRoles.push(selectedRoles[k].value)
                }
                console.log('ffffffffffffff')
                console.log(id)
                console.log(TempRoles)
                organizations.push({
                    organization:id,
                    roles:TempRoles
                })
                console.log('push')
                console.log(organizations)
                userData.organizations = organizations;
                UserService.updateUser(selectedUser.value,userData).then((res)=>{
                    console.log("user updated .... success")
                })
            })

        }
        console.log(exist)

        localStorage.setItem("notification","added");
        navigate('/admins');

    }
    return(
        <div >
            <Sidebar data={SidebarData}/>
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <fieldset style= {Styles.fieldset}>
                        <form onSubmit={saveAdmin}>

                            <div className="form-outline mb-4">

                            <div className="form-outline mb-4">
                                <Select
                                    options={users}
                                    placeholder="please select user"
                                    value={selectedUser}
                                    onChange={handleSelectProfessional}
                                    isSearchable={true}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text"  className="form-control"
                                       name="organization"
                                       value={organization.name}
                                       readonly="readonly"
                                />
                            </div>
                            <Select
                                options={roles}
                                placeholder="please select roles"
                                value={selectedRoles}
                                onChange={handleSelectRoles}
                                isSearchable={true}
                                isMulti
                            />
                                <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>)
}

export default PopupAssignAdmin;