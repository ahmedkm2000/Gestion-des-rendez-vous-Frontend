import React,{useState,useEffect} from "react";
import {useParams,useNavigate } from 'react-router-dom';
import UserService from "../services/UserService";

export default function AddAdmin(){
    const [formData,setFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(id!=undefined)
          UserService.getUserById(id).then((res)=>{
                setFormData(res.data);
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
    function saveAdmin(event){
        event.preventDefault()
        if(formData._id===undefined){
            UserService.createUser(formData).then((res)=>{
                localStorage.setItem("notification","added");
                navigate('/admins');
            })
        }else {
            UserService.updateUser(formData._id,formData).then((res)=>{
                localStorage.setItem("notification","updated");
                navigate('/admins')

            });
        }
    }
    return(
        <div >
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
                    <div class="form-outline mb-4">
                        <input type="text" id="form4Example2" class="form-control"
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

                    <button type="submit" class="btn btn-primary btn-block mb-4">Save</button>
                </form>
            </fieldset>
        </div>
    )
}