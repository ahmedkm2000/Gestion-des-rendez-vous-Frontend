import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAuth} from "./Auth";
import Sidebar from "./Sidebar";
import {SidebarAdminData} from "./SidebarData";

export default function AdminPage (){
    const roles =[];
    const auth = useAuth();
    const {id} = useParams();
    const [isAdmin,setIsAdmin] = useState(false);
    const [isDoctor,setIsDoctor] = useState(false);
    const [isEntryClerk,setIsEntryClerk] = useState(false);
    const [sidebar, setSidebar] = useState(true);
    useEffect(()=>{
        console.log("test1")
        const listOrg = JSON.parse(localStorage.getItem("userInfo")).organizations;
        const roles = [];
        for(let i = 0 ; i < listOrg.length;i++){
            roles.push({
                id:listOrg[i].organization._id,
                roles:listOrg[i].roles
            })
        }
        for(let i = 0 ; i < roles.length;i++){
            if(roles[i].id === id){
                for(let j = 0 ; j < roles[i].roles.length;j++){
                        if (roles[i].roles[j].name==="admin"){
                            setIsAdmin(true)
                            console.log('admin:true')
                        }
                        if (roles[i].roles[j].name==="doctor"){
                            setIsDoctor(true)
                        }
                        if (roles[i].roles[j].name ==="entry clerk"){
                            setIsEntryClerk(true)
                        }
                    }

            }
            }
    },[])
    return(
        <div>
            {auth.user!=undefined && isAdmin===true?
                <Sidebar data={SidebarAdminData(id)}/>
                :""}

        </div>
    )
}