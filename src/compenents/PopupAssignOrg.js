import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/popup.css';
import Select from "react-select";
import {toast} from 'react-toastify';
import UserService from "../services/UserService";
import RoleService from "../services/RoleService";
import OrganizationService from "../services/OrganizationService";
toast.configure()
const PopupAssignOrg = props => {
    const [roles, setRoles] = useState([]);
    const [organization, setOrganization] = useState();
    const [selectedRoles,setSelectedRoles] = useState([]);
    const [email, setEmail] = useState();
    const [isHidden, setIsHidden] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const Styles = {fieldset:{textAlign:"center",}}

    useEffect(() => {
        var TempRoles = [];
        UserService.getUserById(id).then((res)=>{
            setEmail(res.data.email);
        });
        RoleService.getAllRoles().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                TempRoles.push({
                    value: res.data[i]._id,
                    label: res.data[i].name
                })
            }
        })
        setRoles(TempRoles)
    },[])


    function handleSelectRoles(data) {
        setSelectedRoles(data)
    }
    async function handleSelectUser(event){
        setIsHidden(true);
        const organization = event.target.value;
        setOrganization(organization);
    }

    function validateOrganization(){
        UserService.getUserById(id).then((res)=>{
            setIsHidden(false);
            for(let i = 0 ; i<res.data.organizations.length ; i++){
                if(res.data.organizations[i].organization.name === organization){
                    setIsHidden(true);
                    toast.error('user has already a role in this organization!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
                }
            }
        })
    }

    async function saveOrganization(event){
        event.preventDefault();
        event.persist();
        if(selectedRoles.length<1){
            toast.error('please choose at least one role!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }else{
        OrganizationService.getOrganizationByName(organization).then((res)=>{
            var organizationData = res.data
            var idOrg = res.data._id;
            var users = res.data.users;
            users.push(id);
            organizationData.users = users;
            OrganizationService.updateOrganization(idOrg,organizationData).then((res)=>{
                console.log("added to org")
            });
            UserService.getUserById(id).then((res)=>{
                var TempRoles = []
                var userData = res.data;
                var organizations = res.data.organizations;
                for (let k=0; k<selectedRoles.length;k++){
                    TempRoles.push(selectedRoles[k].value)
                }
                organizations.push({
                    organization:idOrg,
                    roles:TempRoles
                })
                userData.organizations = organizations;
                UserService.updateUser(id,userData).then((res)=>{
                    props.handleClose();
                })
            })
        })
    }}

    return(
        <div >
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <fieldset style= {Styles.fieldset}>
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control"
                                       placeholder="please enter an organization"
                                       name="organization"
                                       value={organization}
                                       onChange={(e) => handleSelectUser(e)}
                                />
                                <button className="btn btn-primary btn-block mb-4" onClick={validateOrganization}>Validate</button>
                            </div>
                            {isHidden === false?
                                <form onSubmit={saveOrganization}>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline mb-4">
                                            <input type="text"  className="form-control"
                                                   name="email"
                                                   value={email}
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

export default PopupAssignOrg;