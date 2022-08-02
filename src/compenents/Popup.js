import React,{useState , useEffect} from "react";
import '../styles/popup.css';
import {useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import UserService from "../services/UserService";
import OrganizationService from "../services/OrganizationService";
import RoleService from "../services/RoleService";
import {toast} from "react-toastify";
toast.configure()
const Popup = props => {
    const [formData,setFormData] = useState({});
    const [organization, setOrganization] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles,setSelectedRoles] = useState([]);
    const [idAdmin,setIdAdmin] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const Styles = {
        fieldset:{
            textAlign:"center",

        }
    }
    useEffect(() => {
        var TempRoles= [];
        RoleService.getAllRoles().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                TempRoles.push({
                    value: res.data[i]._id,
                    label: res.data[i].name
                })
            }
            setRoles(TempRoles);
        });
        OrganizationService.getOrganizationById(id).then((res)=>{
            setOrganization(res.data)
        });
    },[])

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

    function handleSelectRoles(data) {
        setSelectedRoles(data)
    }

    async function saveUser(event){
        event.preventDefault()
        var roleShema=[]
        if(selectedRoles.length<1){
            toast.error('please choose at least one role!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }else {
            for (let i = 0; i < selectedRoles.length; i++) {
                roleShema.push(selectedRoles[i].value)
            }
            formData.organizations = {
                organization: organization._id,
                roles: roleShema
            }
            UserService.createUser(formData).then(() => {
                UserService.getUserEmail(formData.email).then((res) => {
                    var ids = []
                    ids.push(id)
                    OrganizationService.addUsersToOrganizations(res.data._id, ids).then(() => {
                        console.log("success")
                    })
                })
            })
            props.handleClose();
            toast.success('User has been added successufely!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})

        }
    }
    return(
        <div >
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
            <fieldset style= {Styles.fieldset}>
                <form onSubmit={saveUser}>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's First Name"
                               name="firstName"
                               required
                               value={formData.firstName}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" id="form4Example2" className="form-control"
                               placeholder="Admin's Last Name"
                               name="lastName"
                               required
                               value={formData.lastName}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's Adresse"
                               name="adresse"
                               required
                               value={formData.adresse}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="email"  className="form-control"
                               placeholder="Admin's Email"
                               name="email"
                               required
                               value={formData.email}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               placeholder="Admin's Phone Number"
                               name="phoneNumber"
                               required
                               value={formData.phoneNumber}
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text"  className="form-control"
                               name="organization"
                               required
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
                </form>
            </fieldset>
                </div>
            </div>
        </div>)
}

export default Popup;