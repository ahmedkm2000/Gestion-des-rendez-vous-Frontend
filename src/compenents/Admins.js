import React,{useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../services/UserService";
export default function Admins(){
    const [admins,setAdmins] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        UserService.getAllUsers().then((res)=>{
            setAdmins(res.data)
        })
        let notification = localStorage.getItem("notification");
        if(notification==="added"){
            toast.success('Organization has been added successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        if (notification==="updated"){
            toast.success('Organization has been updated successufely !', {position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
        }
        localStorage.setItem("notification",null);
    },[])
    function updateAdmin(id){
        navigate(`/admins/edit/${id}`)

    }
    function deleteAdmin(id){

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
        }
    }

    return(
        <div style={Styles.tables}>
            <table style={Styles.border} class="table table-bordered" >
                <thead style={Styles.thead}>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {admins!=undefined?admins.map((admin)=>{
                    return(
                        <tr key={admin._id}>
                            <td scope="row">{admin.firstName}</td>
                            <td>{admin.lastName}</td>
                            <td>{admin.adresse}</td>
                            <td>{admin.email}</td>
                            <td>{admin.phoneNumber}</td>
                            <td style={Styles.button}>
                                <button type="button" class="btn btn-success" onClick={()=> updateAdmin(admin._id)}>Update</button>
                                <button type="button" class="btn btn-danger" onClick={()=> deleteAdmin(admin._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }):""}



                </tbody>
            </table>
        </div>

    )
}