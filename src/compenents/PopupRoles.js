import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/popup.css';
import Select from "react-select";
import {toast} from 'react-toastify';
import UserService from "../services/UserService";
import RoleService from "../services/RoleService";
import OrganizationService from "../services/OrganizationService";
toast.configure()
const PopupRoles = props => {
    const [roles, setRoles] = useState([]);
    const [selectedRoles,setSelectedRoles] = useState();
    const { id } = useParams();
    var [idOrg,setIdOrg] = useState();
    const navigate = useNavigate();
    useEffect(() => {
         idOrg = props.organization;
         setIdOrg(props.organization)
        var TempRoles = [];
        var optionRoles = [];
        RoleService.getAllRoles().then((res)=>{
            console.log(res.data)
            for (let j = 0 ; j<res.data.length; j++){
                optionRoles.push({
                    value:res.data[j]._id,
                    label:res.data[j].name
                })
            }
            console.log(optionRoles)
            setRoles(optionRoles)
        })
        UserService.getUserById(id).then((res)=>{
           for (let i = 0 ; i<res.data.organizations.length ; i++){
               if(res.data.organizations[i].organization._id === idOrg){
                   for (let j = 0 ; j<res.data.organizations[i].roles.length ; j++){
                       TempRoles.push({
                           value:res.data.organizations[i].roles[j]._id,
                           label:res.data.organizations[i].roles[j].name
                       })
                   }
               }
           }
           setSelectedRoles(TempRoles)
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
    async function updateRoles(event) {
        event.preventDefault();
        event.persist();
        if(selectedRoles.length<1){
            toast.error('please choose at least one role!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }else{
        var OrganizationShema = [];
        await OrganizationService.getOrganizationById(idOrg).then((res)=>{
            for (let i=0; i<res.data.users.length;i++){
                if (res.data.users[i]._id === id){
                    for (let j=0; j<res.data.users[i].organizations.length;j++){
                        if(res.data.users[i].organizations[j].organization === idOrg){
                            var TempRoles = [];
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
                    UserService.getUserById(id).then((res)=>{
                        var userData = res.data;
                        userData.organizations = OrganizationShema;
                        UserService.updateUser(id,userData).then((res)=>{
                            props.handleClose();
                        })
                    })
                }
            }
        })
        }
    }
    return(
        <div >
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <fieldset style= {Styles.fieldset}>
                        <form onSubmit={updateRoles}>
                            <Select
                                options={roles}
                                placeholder="please select roles"
                                value={selectedRoles}
                                onChange={handleSelectRoles}
                                isSearchable={true}
                                isMulti
                            />
                            <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>)
}

export default PopupRoles;