import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/popup.css';
import Sidebar from "./Sidebar";
import {SidebarData} from "./SidebarData";
import Select from "react-select";
import UserService from "../services/UserService";
import OrganizationService from "../services/OrganizationService";
import RoleService from "../services/RoleService";
import {toast} from "react-toastify";

const PopupAssignAdmin = props => {
    const [organization, setOrganization] = useState([]);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedRoles,setSelectedRoles] = useState([]);
    var [idUser,setIdUser] = useState() ;
    const [isHidden, setIsHidden] = useState(true);
    var TempIdRoles =[];
    var TempRoles= []
    const { id } = useParams();
    const navigate = useNavigate();
    const Styles = {
        fieldset:{
            textAlign:"center",
        }
    }
    useEffect(() => {
        OrganizationService.getOrganizationById(id).then((res)=>{
            setOrganization(res.data)
        })
    },[])
    function handleSelectRoles(data) {
        setSelectedRoles(data)
    }
    async function handleSelectProfessional(event){
        setIsHidden(true)
        const email = event.target.value;
        setUser(email);
    }
    async function validateEmail(){
       await UserService.getUserEmail(user).then((res)=>{
            idUser = res.data._id ;
            setIdUser(idUser)
            if(idUser!=undefined){
                setIsHidden(false);
            }else{
                setIsHidden(true);
            }
        })
        await RoleService.getAllRoles().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                TempRoles.push({
                    value: res.data[i]._id,
                    label: res.data[i].name
                })
            }
        })
        setRoles(TempRoles)
        await OrganizationService.getOrganizationById(id).then((res)=>{
            for(let i = 0 ; i <res.data.users.length;i++){
                if(res.data.users[i]._id === idUser){
                    UserService.getUserById(idUser).then((res)=>{
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
    }

    async function saveAdmin(event){
        var RolesShema =[]
        var OrganizationShema = []
        var exist = false;
        event.preventDefault()
        if(selectedRoles.length<1){
            toast.error('please choose at least one role!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }else{
        for (let i=0; i<selectedRoles.length;i++){
            RolesShema.push(selectedRoles[i].value)
        }
        await OrganizationService.getOrganizationById(id).then((res)=>{
            for (let i=0; i<res.data.users.length;i++){
                if (res.data.users[i]._id === idUser){
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
                    UserService.getUserById(idUser).then((res)=>{
                        var userData = res.data;
                        userData.organizations = OrganizationShema;
                        UserService.updateUser(idUser,userData).then((res)=>{
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
                users.push(idUser);
                organizationData.users = users;
                OrganizationService.updateOrganization(id,organizationData).then((res)=>{
                    console.log("added to org")
                })
            })
            UserService.getUserById(idUser).then((res)=>{
                var TempRoles = []
                var userData = res.data;
                var organizations = res.data.organizations;
                for (let k=0; k<selectedRoles.length;k++){
                    TempRoles.push(selectedRoles[k].value)
                }
                organizations.push({
                    organization:id,
                    roles:TempRoles
                })
                userData.organizations = organizations;
                UserService.updateUser(idUser,userData).then((res)=>{
                    console.log("user updated .... success")
                })
            })

        }
    }
        props.handleClose();
        toast.success('User has been added successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})


    }
    return(
        <div >
            <Sidebar data={SidebarData}/>
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <fieldset style= {Styles.fieldset}>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control"
                                   placeholder="please enter a user"
                                   name="user"
                                   value={user}
                                   onChange={(e) => handleSelectProfessional(e)}
                            />
                            <button className="btn btn-primary btn-block mb-4" onClick={validateEmail}>Validate</button>
                        </div>
                        {isHidden === false?
                        <form onSubmit={saveAdmin}>
                            <div className="form-outline mb-4">
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
                            :""}
                    </fieldset>
                </div>
            </div>
        </div>)
}

export default PopupAssignAdmin;