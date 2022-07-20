import React,{useState,useEffect} from "react";
import {useParams,useNavigate } from 'react-router-dom';
import OrganizationService from '../services/OrganizationService.js';

export default function AddOrganization(){
    const [formData,setFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(id!=undefined)
            OrganizationService.getOrganizationById(id).then((res)=>{
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
    function saveOrganization(event){
        event.preventDefault()
        if(formData._id===undefined){
        OrganizationService.createOrganization(formData).then((res)=>{
            localStorage.setItem("notification","added");
            navigate('/organizations');
        })
       }else {
        OrganizationService.updateOrganization(formData._id,formData).then((res)=>{
            localStorage.setItem("notification","updated");
            navigate('/organizations')
 
        });
        }
    }
    return(
<div >
<fieldset style= {Styles.fieldset}>
  <form onSubmit={saveOrganization}>
  <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" 
    placeholder="Organization's Name"
    name="name"
    value={formData.name}
    onChange={(e) => onChange(e)}   
    />
  </div>

  <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4" 
    placeholder="Organization's Description"
    name="description"
    value={formData.description}
    onChange={(e) => onChange(e)} 
    />
  </div>

  <div class="form-outline mb-4">
    <input type="text" id="form4Example2" class="form-control" 
    placeholder="Organization's Adresse"
    name="adresse"
    value={formData.adresse}
    onChange={(e) => onChange(e)} 
    />
  </div>

  <button type="submit" class="btn btn-primary btn-block mb-4">Save</button>
</form>
</fieldset>
</div>
    )
}